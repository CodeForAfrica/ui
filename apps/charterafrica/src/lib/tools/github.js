import fetchJson, { FetchError } from "@/charterafrica/utils/fetchJson";

export const GET_REPOSITORY = `query($repositoryOwner: String!, $repositoryName: String!) {
  repository(owner: $repositoryOwner, name: $repositoryName) {
    name
    url
    openGraphImageUrl
    description
    updatedAt
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
  throw new FetchError("An Error occured", res.errors, 500);
};
