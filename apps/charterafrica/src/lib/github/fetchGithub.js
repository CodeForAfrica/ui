import fetchJson from "@/charterafrica/utils/fetchJson";

export const getRepoDetails = async ({ link, ...params }) => {
  const nameAndOwner = link.replace("https://github.com/", "");
  const res = await fetchJson.get(
    `https://api.github.com/repos/${nameAndOwner}`,
    { params }
  );
  return res;
};

export const getContributorsPerRepo = async ({ link, ...params }) => {
  const nameAndOwner = link.replace("https://github.com/", "");
  const res = await fetchJson.get(
    `https://api.github.com/repos/${nameAndOwner}/contributors`,
    { params }
  );
  return res;
};

export const getUserDetails = async ({ user, ...params }) => {
  const res = await fetchJson.get(`https://api.github.com/users/${user}`, {
    params,
  });
  return res;
};

export const getOrganization = async ({ organization, ...params }) => {
  const res = await fetchJson.get(
    `https://api.github.com/orgs/${organization}`,
    {
      params,
    }
  );
  return res;
};
