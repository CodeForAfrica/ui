import * as Sentry from "@sentry/nextjs";

import fetchJson, { FetchError } from "@/charterafrica/utils/fetchJson";

const GET_REPOSITORY = `query($repositoryOwner: String!, $repositoryName: String!) {
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

async function fetchRepository(variables) {
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
  Sentry.captureException(message);
  throw new FetchError(message, res.errors, 500);
}

async function fetchGithubApi(path, tag) {
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
    Sentry.captureException(e.message);
    return null;
  }
}

export async function processTool({ externalId, airtableId }) {
  if (!externalId?.trim()) {
    const message = `Could not fetch Tool ${airtableId} from Github`;
    Sentry.captureException(message);
    return null;
  }
  let [repositoryOwner, repositoryName] = externalId
    .replace(/^https?:\/\/github\.com\//, "")
    .replace(/\/$/, "")
    .split("/");
  repositoryOwner = repositoryOwner?.trim();
  repositoryName = repositoryName?.trim();
  if (!repositoryName || !repositoryOwner) {
    const message = `Could not fetch Tool ${airtableId} from Github. Repository Name and Owner are required`;
    Sentry.captureException(message);
    return null;
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

export async function processOrganisation({ externalId, airtableId, eTag }) {
  if (!externalId?.trim()) {
    const message = `Could not fetch Organisation ${airtableId} from Github`;
    Sentry.captureException(message);
    return null;
  }

  const data = await fetchGithubApi(`orgs/${externalId}`, eTag);
  if (!data) {
    return null;
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

export async function processContributor({ externalId, airtableId, eTag }) {
  if (!externalId?.trim()) {
    const message = `Could not fetch Contributor ${airtableId} from Github`;
    Sentry.captureException(message);
    return null;
  }
  const data = await fetchGithubApi(`users/${externalId}`, eTag);
  if (!data) {
    return null;
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
