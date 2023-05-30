import getListFromAirtable from "@/charterafrica/lib/ecosystem/airtable";

export const processTool = (
  data,
  {
    theme,
    externalId,
    name,
    deployedLocation,
    description,
    donors,
    partners,
    origin,
    socialMedia,
    contributors,
    organisation,
  }
) => {
  const techSkills = data.languages?.nodes?.map((language) => ({
    language: language?.name,
  }));
  const commit = data?.defaultBranchRef?.target.history.edges?.[0]?.node;
  const tool = {
    externalId,
    avatarUrl: data?.owner?.avatarUrl ?? null,
    name,
    description,
    link: data?.homepageUrl,
    deployedLocation,
    theme,
    techSkills,
    lastCommit: {
      author: commit?.author?.name,
      committedDate: commit?.committedDate,
      message: commit?.message,
    },
    stars: data?.stargazers?.totalCount,
    views: data?.watchers?.totalCount,
    forks: data?.forks?.totalCount,
    contributors,
    organisation,
    source: "github",
    sourceUpdatedAt: new Date(data.updatedAt),
    deletedAt: null,
    donors,
    partners,
    origin,
    socialMedia,
  };
  return tool;
};

export const processOrganisation = (data, { description, type, name }) => {
  return {
    externalId: name,
    type,
    name,
    description,
    location: data?.owner?.location ?? null,
    website: data.url ?? null,
    twitter: data?.owner?.twitterUsername ?? null,
    avatarUrl: data?.owner?.avatarUrl ?? null,
    email: data?.owner?.email ?? null,
    source: "github",
    lastActive: data.owner.updatedAt,
  };
};

export const processContributors = (data) => {
  return (
    data.map((person) => ({
      externalId: person?.login,
      fullName: person?.name ?? null,
      username: person?.login ?? null,
      description: person.bio ?? null,
      location: person?.location ?? null,
      twitter: person?.twitterUsername ?? null,
      avatarUrl: person?.avatarUrl ?? null,
      type: person?.type,
      source: "github",
      email: person.email ?? null,
      lastActive: person.updatedAt,
    })) || []
  );
};

export const updateEcosystemList = async (req, res) => {
  const args = {
    baseId: "appDuwqg5qeS4h5ji",
    tableIdOrName: "tblBhgz5VmG9IZVe4",
  };
  const response = await getListFromAirtable(args);
  res.status(200).json(response);
};

export const updateEcosystemContent = () => {};
