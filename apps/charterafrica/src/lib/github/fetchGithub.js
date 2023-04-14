import fetchJson from "@/charterafrica/utils/fetchJson";

export const fetchGithub = async (url, queryParams) => {
  const params = { ...queryParams };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };
  const res = await fetchJson.get(url, { params, headers });
  return res;
};

export const fetchRepoDetails = async (github) => {
  const res = await fetchGithub(`https://api.github.com/repos/${github}`);
  return res;
};

export const fetchContributorsPerRepo = async (nameAndOwner) => {
  const res = await fetchGithub(
    `https://api.github.com/repos/${nameAndOwner}/contributors`
  );
  return res;
};

export const fetchUserDetails = async (user) => {
  const res = await fetchGithub(`https://api.github.com/users/${user}`);
  return res;
};

export const fetchOrganization = async (organization) => {
  const res = await fetchGithub(`https://api.github.com/orgs/${organization}`);
  return res;
};

export const fetchLanguageTechSkills = async (nameAndOwner) => {
  const res = await fetchGithub(
    `https://api.github.com/repos/${nameAndOwner}/languages`
  );
  return Object.keys(res);
};

export const fetchLatestCommit = async (nameAndOwner) => {
  const res = await fetchGithub(
    `https://api.github.com/repos/${nameAndOwner}/commits`
  );
  if (res.length) {
    const latest = res[0];
    return latest || {};
  }
  return {};
};
