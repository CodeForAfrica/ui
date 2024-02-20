import * as Sentry from "@sentry/nextjs";

import github from "./github";

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

const GET_USER = `query($username: String!) {
  user(login: $username) {
    name
    avatarUrl
    url
    email
    location
    login
    websiteUrl
    repositories(first: 3, orderBy: {field: STARGAZERS, direction: DESC}) {
      edges {
        node {
          name
          description
          stargazers {
            totalCount
          }
          visibility
          url
          updatedAt
          languages(first:5) {
          edges  {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
}`;

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

  const data = await github.graphQuery(GET_REPOSITORY, {
    repositoryOwner,
    repositoryName,
  });
  const { repository } = data;

  const techSkills = repository.languages?.nodes?.map((language) => ({
    language: language?.name,
  }));
  const commit = repository?.defaultBranchRef?.target.history.edges?.[0]?.node;
  return {
    externalId,
    repoLink: repository.url,
    link: repository.homepageUrl,
    techSkills,
    lastCommit: {
      author: commit?.author?.name,
      committedDate: commit?.committedDate,
      message: commit?.message,
    },
    stars: repository?.stargazers?.totalCount,
    views: repository?.watchers?.totalCount,
    forks: repository?.forks?.totalCount,
    source: "github",
    sourceUpdatedAt: new Date(repository.updatedAt),
  };
}

export async function fetchOrganisation({ externalId, eTag }) {
  const data = await github.restQuery(`orgs/${externalId}`, eTag);
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

export async function fetchContributor({ externalId }) {
  const data = await github.graphQuery(GET_USER, {
    username: externalId,
  });
  const {
    user: { name, avatarUrl, url, email, location, websiteUrl, repositories },
  } = data;

  const repos = repositories?.edges?.map((edge) => {
    const {
      name: repoName,
      description,
      stargazers,
      visibility,
      url: repoURL,
      updatedAt,
      languages,
    } = edge?.node ?? {};

    const techSkills = languages?.edges
      ?.map((language) => language?.node?.name)
      .join(", ");

    return {
      name: repoName,
      description,
      stargazers: stargazers?.totalCount,
      visibility,
      url: repoURL,
      updatedAt,
      techSkills,
    };
  });

  return {
    fullName: name,
    avatarUrl,
    repoLink: url,
    location,
    website: websiteUrl,
    email,
    repositories: repos,
  };
}
