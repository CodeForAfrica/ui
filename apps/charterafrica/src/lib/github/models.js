import api from "../payload";

import {
  fetchContributorsPerRepo,
  fetchLanguageTechSkills,
  fetchLatestCommit,
  fetchOrganization,
  fetchUserDetails,
  fetchRepoDetails,
} from "./fetchGithub";

const ORGANIZATION_COLLECTION = "github-organisations";
const PEOPLE_COLLECTION = "github-people";
const TOOL_COLLECTION = "tool-github";

export const createOrganization = async (org) => {
  const { docs } = await api.getCollection(ORGANIZATION_COLLECTION, {
    where: {
      github: { equals: org },
    },
  });
  if (docs.length) {
    return docs[0];
  }
  const organisation = await fetchOrganization(org);
  const toCreate = {
    github: organisation?.login,
    type: organisation?.type,
    name: organisation?.name,
    description: organisation?.description,
    location: organisation?.location,
    website: organisation?.html_url,
    twitter: organisation?.twitter_username,
    email: organisation?.email,
  };
  const data = await api.createCollection(ORGANIZATION_COLLECTION, toCreate);
  return data;
};

export const createPerson = async (user) => {
  const { docs } = await api.getCollection(PEOPLE_COLLECTION, {
    where: {
      github: { equals: user },
    },
  });
  if (docs.length) {
    return docs[0];
  }

  const person = await fetchUserDetails(user);
  const toCreate = {
    github: person?.login,
    fullName: person?.name,
    username: person?.login,
    description: person.bio,
    country: person?.location,
    twitter: person?.twitter_username,
  };
  const data = await api.createCollection(PEOPLE_COLLECTION, toCreate);
  return data;
};

const fetchAndCreateContributors = async (nameAndOwner) => {
  const contributors = await fetchContributorsPerRepo(nameAndOwner);
  const promises = contributors?.map(({ login }) => createPerson(login)) || [];
  return Promise.all(promises);
};

export const createTool = async (data) => {
  const { github, name, description, location, topic } = data;
  const { docs } = await api.getCollection(TOOL_COLLECTION, {
    where: {
      github: { equals: github },
    },
  });
  if (docs.length) {
    return docs[0];
  }
  const repoDetails = await fetchRepoDetails(github);
  const promises = [
    fetchLanguageTechSkills(github),
    fetchLatestCommit(github),
    createOrganization(repoDetails?.organization?.login),
    fetchAndCreateContributors(github),
  ];
  const [languages, lastCommit, organisation, contributors] = await Promise.all(
    promises
  );
  const languagesTechSkills = languages.map((language) => ({ language }));
  const people = contributors.map(({ id }) => id);
  const toCreate = {
    github,
    name,
    description,
    link: repoDetails?.html_url,
    location,
    topic,
    languagesTechSkills,
    lastCommit,
    stars: repoDetails?.stargazers_count,
    views: repoDetails?.watchers_count,
    forks: repoDetails?.forks,
    organisation: organisation?.id,
    people,
  };
  const res = await api.createCollection(TOOL_COLLECTION, toCreate);
  return res;
};
