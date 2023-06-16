import * as Sentry from "@sentry/nextjs";

import {
  ORGANIZATION_COLLECTION,
  CONTRIBUTORS_COLLECTION,
  TOOL_COLLECTION,
} from "@/charterafrica/lib/ecosystem/models";
import api from "@/charterafrica/lib/payload";
import fetchJson, { FetchError } from "@/charterafrica/utils/fetchJson";

export const GET_REPOSITORY = `query($repositoryOwner: String!, $repositoryName: String!) {
  repository(owner: $repositoryOwner, name: $repositoryName) {
    name
    url
    openGraphImageUrl
    description
    updatedAt
    homepageUrl
    stargazers {
      totalCount
    }
    watchers {
      totalCount
    }
    forks {
      totalCount
    }
    languages(first: 15) {
      nodes {
        name
      }
    }
    defaultBranchRef {
      target {
        ... on Commit {
          history(first: 1) {
            edges {
              node {
                id
          message
          committedDate
          author {
            name
            email
          }
              }
            }
          }
        }
      }
    }
    collaborators(first: 100) {
      nodes {
        login
        name
        bio
        location
        twitterUsername
        avatarUrl
        ... on User {
          updatedAt
        }
        email
      }
    }
    owner {
      ... on Organization {
        login
        name
        description
        location
        twitterUsername
        email
        url
        avatarUrl
        updatedAt
      }
    }
  }
}`;

export const fetchRepository = async (variables) => {
  const url = "https://api.github.com/graphql";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };
  const data = {
    variables,
    query: GET_REPOSITORY,
  };
  const res = await fetchJson.post(url, { data, headers });
  if (res?.data?.repository) {
    return res.data.repository;
  }
  const message = `Unable to fetch ${variables.repositoryOwner}/${
    variables.repositoryName
  } from github errors ${JSON.stringify(res.errors)}`;
  Sentry.captureMessage(message);
  throw new FetchError(message, res.errors, 500);
};

export async function fetchGithubApi(path, tag) {
  try {
    const url = `https://api.github.com/${path}`;
    const headers = {
      "If-None-Match": tag,
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    };
    const res = await fetch(url, { headers });
    const response = await res.json();
    const eTag = res.headers.get("ETag") || "";
    if (res.ok) {
      return { ...response, eTag };
    }
    if (res.status !== 304) {
      const message = `Error fetching "${url}" from github errors ${JSON.stringify(
        response
      )}`;
      throw new FetchError(message, response, 500);
    }
    return null;
  } catch (e) {
    Sentry.captureMessage(e.message);
    return null;
  }
}

export async function processGithubTool({ externalId }) {
  if (!externalId?.trim()) {
    return {};
  }
  let [repositoryOwner, repositoryName] = externalId
    .replace(/^https?:\/\/github\.com\//, "")
    .replace(/\/$/, "")
    .split("/");
  repositoryOwner = repositoryOwner?.trim();
  repositoryName = repositoryName?.trim();
  if (!repositoryName || !repositoryOwner) {
    return {};
  }
  const data = await fetchRepository({
    repositoryOwner,
    repositoryName,
  });
  const techSkills = data.languages?.nodes?.map((language) => ({
    language: language?.name,
  }));
  const commit = data?.defaultBranchRef?.target.history.edges?.[0]?.node;
  return {
    externalId,
    repoLink: data.url,
    link: data.homepageUrl,
    techSkills,
    lastCommit: {
      author: commit?.author?.name,
      committedDate: commit?.committedDate,
      message: commit?.message,
    },
    stars: data?.stargazers?.totalCount,
    views: data?.watchers?.totalCount,
    forks: data?.forks?.totalCount,
    source: "github",
    sourceUpdatedAt: new Date(data.updatedAt),
  };
}

export async function processGithubOrganisation({ externalId, eTag }) {
  if (!externalId?.trim()) {
    return {};
  }
  const data = await fetchGithubApi(`orgs/${externalId}`, eTag);
  if (!data) {
    return {};
  }
  return {
    avatarUrl: data.avatar_url,
    repoLink: data.html_url,
    location: data.location,
    website: data.blog,
    email: data.email,
    eTag: data.eTag,
  };
}

export async function processGithubContributor({ externalId, eTag }) {
  if (!externalId?.trim()) {
    return {};
  }
  const data = await fetchGithubApi(`users/${externalId}`, eTag);
  if (!data) {
    return {};
  }
  return {
    fullName: data.name,
    avatarUrl: data.avatar_url,
    repoLink: data.html_url,
    location: data.location,
    website: data.blog,
    email: data.email,
    eTag: data.eTag,
  };
}

export async function getToolfromCacheOrGithub(airtableData) {
  const { airtableId } = airtableData;
  const { docs } = await api.getCollection(TOOL_COLLECTION, {
    where: {
      airtableId: { equals: airtableId },
    },
  });
  if (docs.length) {
    return docs?.[0];
  }
  return processGithubTool(airtableData);
}

export async function getOrganisationFromCacheOrGithub(airtableData) {
  const { airtableId } = airtableData;
  const { docs } = await api.getCollection(ORGANIZATION_COLLECTION, {
    where: {
      airtableId: { equals: airtableId },
    },
  });
  if (docs.length) {
    return docs?.[0];
  }
  return processGithubOrganisation(airtableData);
}

export async function getContributorFromCacheOrGithub(airtableData) {
  const { airtableId } = airtableData;
  const { docs } = await api.getCollection(CONTRIBUTORS_COLLECTION, {
    where: {
      airtableId: { equals: airtableId },
    },
  });
  if (docs.length) {
    return docs?.[0];
  }
  return processGithubContributor(airtableData);
}
