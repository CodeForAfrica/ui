import * as Sentry from "@sentry/nextjs";

import fetchJson, { FetchError } from "@/charterafrica/utils/fetchJson";

const BASE_URL = "https://api.github.com";
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
    }
  }`;

async function fetchRepository(variables) {
  const url = `${BASE_URL}/graphql`;
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
  const url = `${BASE_URL}/${path}`;
  const headers = {
    "If-None-Match": tag,
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };
  try {
    const res = await fetch(url, { headers });
    if (res.ok) {
      const response = await res.json();
      const eTag = res.headers.get("ETag") || "";
      return { ...response, eTag };
    }
    if (res.status !== 304) {
      const response = await res.json();
      const message = `Error fetching "${url}" from github errors ${JSON.stringify(
        response,
      )}`;
      throw new FetchError(message, res, 500);
    }
    return null;
  } catch (e) {
    console.log({ e, path, tag });
    Sentry.captureException(e);
    return null;
  }
}

export async function fetchTool({ externalId }) {
  let [repositoryOwner, repositoryName] = externalId
    .replace(/^https?:\/\/github\.com\//, "")
    .replace(/\/$/, "")
    .split("/");
  repositoryOwner = repositoryOwner?.trim();
  repositoryName = repositoryName?.trim();
  if (!repositoryName || !repositoryOwner) {
    const message = `Could not fetch Tool ${externalId} from Github. Owner/RepositoryName required`;
    Sentry.captureMessage(message);
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

export async function fetchOrganisation({ externalId, eTag }) {
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

export async function fetchContributor({ externalId, eTag }) {
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
