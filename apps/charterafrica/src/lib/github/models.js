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
      organisationGitHub: { equals: org },
    },
  });
  if (docs.length) {
    return docs[0];
  }
  const organisation = await fetchOrganization(org);
  //   TODO Relate many to any organization and people
  const toCreate = {
    organisationGitHub: organisation?.login,
    type: organisation?.type,
    organisationName: organisation?.name,
    organisationDescription: organisation?.description,
    organisationLocation: organisation?.location,
    organisationWebsite: organisation?.html_url,
    organisationTwitter: organisation?.twitter_username,
    organisationEmail: organisation?.email,
  };
  const data = await api.createCollection(ORGANIZATION_COLLECTION, toCreate);
  return data;
};

export const createPerson = async (user) => {
  const { docs } = await api.getCollection(PEOPLE_COLLECTION, {
    where: {
      peopleGitHub: { equals: user },
    },
  });
  if (docs.length) {
    return docs[0];
  }

  const person = await fetchUserDetails(user);
  //   TODO Relate many to any organization and people
  const toCreate = {
    peopleGitHub: person?.login,
    peopleFullName: person?.name,
    peopleUsername: person?.login,
    peopleDescription: person.bio,
    peopleCountry: person?.location,
    peopleTwitter: person?.twitter_username,
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
  const { toolGithub, toolName, toolDescription, toolLocation, topic } = data;
  const { docs } = await api.getCollection(TOOL_COLLECTION, {
    where: {
      toolGithub: { equals: toolGithub },
    },
  });
  if (docs.length) {
    return docs[0];
  }
  const repoDetails = await fetchRepoDetails(toolGithub);
  const promises = [
    fetchLanguageTechSkills(toolGithub),
    fetchLatestCommit(toolGithub),
    createOrganization(repoDetails?.organization?.login),
    fetchAndCreateContributors(toolGithub),
  ];
  const [languages, lastCommit, organisation, contributors] = await Promise.all(
    promises
  );
  const languagesTechSkills = languages.map((language) => ({ language }));
  const people = contributors.map(({ id }) => id);
  const toCreate = {
    toolGithub,
    toolName,
    toolDescription,
    toolLink: repoDetails?.html_url,
    toolLocation,
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
