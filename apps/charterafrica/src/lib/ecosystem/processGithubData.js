import {
  fetchRepository,
  fetchGithubApi,
} from "@/charterafrica/lib/ecosystem/github";

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
    name: data.name,
    avatarUrl: data.avatar_url,
    repoLink: data.html_url,
    location: data.location,
    website: data.blog,
    email: data.email,
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
    name: data.name,
    avatarUrl: data.avatar_url,
    repoLink: data.html_url,
    location: data.location,
    website: data.blog,
    email: data.email,
  };
}
