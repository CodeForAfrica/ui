import api from "../payload";

import { fetchRepository } from "./fetchGithub";
import { fetchSpreadsheetPerSheet } from "./fetchGSheet";
import { createTool, TOOL_COLLECTION, updateTool } from "./models";

import { FetchError } from "@/charterafrica/utils/fetchJson";

const processRepository = (data, { topic, github, description }) => {
  const people =
    data?.collaborators?.nodes?.map((person) => ({
      github: person?.login,
      fullName: person?.name,
      username: person?.login,
      description: person.bio,
      country: person?.location,
      twitter: person?.twitterUsername,
    })) || [];
  const organisation = {
    github: data?.owner?.name,
    type: "Organisation",
    name: data?.owner?.name,
    description: data?.owner?.description,
    location: data?.owner?.location,
    website: data?.owner?.url,
    twitter: data?.owner?.twitterUsername,
    email: data?.owner?.email,
  };

  const languagesTechSkills = data.languages?.nodes?.map((language) => ({
    language: language?.name,
  }));
  const tool = {
    github,
    name: data?.name,
    description,
    link: data?.url,
    location: data?.location,
    topic,
    languagesTechSkills,
    lastCommit: data?.defaultBranchRef,
    stars: data?.stargazers?.totalCount,
    views: data?.watchers?.totalCount,
    forks: data?.forks?.totalCount,
    people,
    organisation,
  };
  return tool;
};

const processSheet = async (update = false) => {
  const { spreadSheetId, sheetName } = await api.findGlobal("github-tool");
  const data = await fetchSpreadsheetPerSheet({ spreadSheetId, sheetName });
  const uniqueEntries = Object.values(
    data.reduce((acc, obj) => {
      acc[obj["Tool Github"]] = obj;
      return acc;
    }, {})
  );

  const toProcess = uniqueEntries.map(async (rawData, i) => {
    const github = rawData["Tool Github"]
      ?.replace(/^https?:\/\/github\.com\//, "")
      .replace(/\/$/, "");
    let [repositoryOwner, repositoryName] = github.split("/");
    repositoryOwner = repositoryOwner?.trim();
    repositoryName = repositoryName?.trim();
    if (repositoryName && repositoryOwner) {
      const dataFromSheet = {
        github,
        name: rawData["Tool Name"],
        description: rawData["Tool Description"],
        location: rawData["Tool Description"],
        topic: rawData.Topic,
      };
      let savedData;
      const { docs } = await api.getCollection(TOOL_COLLECTION, {
        where: {
          github: { equals: github },
        },
      });
      if (docs.length) {
        savedData = docs?.[0];
        if (!update) {
          return savedData;
        }
      }
      const gitData = await fetchRepository({
        repositoryOwner,
        repositoryName,
      });
      const toCreate = processRepository(gitData, dataFromSheet);
      if (update) {
        if (savedData) {
          const tool = await updateTool({ ...toCreate, id: savedData.id });
          return tool;
        }
        throw new FetchError(`Data does not exist`, rawData, 500);
      }
      const tool = await createTool(toCreate);
      return tool;
    }
    throw new FetchError(
      `Tool is invalid at row ${i}. Use format *CodeForAfrica/ui*`,
      rawData,
      500
    );
  });
  const promises = await Promise.allSettled(toProcess);
  const fulfilled = promises
    .filter((p) => p.status === "fulfilled")
    .map((p) => p.value);
  const rejected = promises.filter((p) => p.status === "rejected");

  return { fulfilled, rejected };
};

export const processGsheet = async (_, res) => {
  try {
    const data = await processSheet();
    return res
      .status(200)
      .json({ message: "PROCESS INITIATED SUCCESSFULLY", data });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateTools = async (_, res) => {
  try {
    const data = await processSheet(true);
    return res
      .status(200)
      .json({ message: "PROCESS INITIATED SUCCESSFULLY", data });
  } catch (error) {
    return res.status(500).send(error);
  }
};
