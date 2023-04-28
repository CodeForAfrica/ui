import api from "../payload";

import { fetchRepository } from "./github";
import {
  updateOrCreateTool,
  TOOL_COLLECTION,
  DIGITAL_DEMOCRACY_ECOSYSTEM,
} from "./models";
import { fetchSpreadSheetSheetByName } from "./spreadsheet";

import { FetchError } from "@/charterafrica/utils/fetchJson";

const processRepository = (data, { topic, externalId, description }) => {
  const people =
    data?.collaborators?.nodes?.map((person) => ({
      externalId: person?.login,
      fullName: person?.name,
      username: person?.login,
      description: person.bio,
      country: person?.location,
      twitter: person?.twitterUsername,
      avatarUrl: person?.avatarUrl,
      type: person?.type,
      source: "github",
      email: person.email,
      lastActive: person.updatedAt,
    })) || [];
  const organisation = {
    externalId: data?.owner?.name,
    type: "Organisation",
    name: data?.owner?.name,
    description: data?.owner?.description,
    location: data?.owner?.location,
    website: data?.owner?.url,
    twitter: data?.owner?.twitterUsername,
    avatarUrl: data?.owner?.avatarUrl,
    email: data?.owner?.email,
    source: "github",
    lastActive: data.owner.updatedAt,
  };

  const languagesTechSkills = data.languages?.nodes?.map((language) => ({
    language: language?.name,
  }));
  const tool = {
    externalId,
    avatarUrl: data?.openGraphImageUrl,
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
    source: "github",
  };
  return tool;
};

const processSheet = async (update = false) => {
  const {
    spreadSheetId,
    sheetName,
    columnMappings: {
      toolLink,
      toolDescription,
      toolName,
      toolTopic,
      toolLocation,
    },
  } = await api.findGlobal(DIGITAL_DEMOCRACY_ECOSYSTEM);
  const data = await fetchSpreadSheetSheetByName({ spreadSheetId, sheetName });
  const uniqueEntries = Object.values(
    data.reduce((acc, obj) => {
      acc[obj[toolLink]] = obj;
      return acc;
    }, {})
  );

  const toProcess = uniqueEntries.map(async (rawData, i) => {
    const externalId = rawData[toolLink]
      ?.replace(/^https?:\/\/github\.com\//, "")
      .replace(/\/$/, "");
    let [repositoryOwner, repositoryName] = externalId.split("/");
    repositoryOwner = repositoryOwner?.trim();
    repositoryName = repositoryName?.trim();
    if (repositoryName && repositoryOwner) {
      const dataFromSheet = {
        externalId,
        name: rawData[toolName],
        description: rawData[toolDescription],
        location: rawData[toolLocation],
        topic: rawData[toolTopic],
      };
      let savedData;
      const { docs } = await api.getCollection(TOOL_COLLECTION, {
        where: {
          externalId: { equals: externalId },
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
          const tool = await updateOrCreateTool({
            ...toCreate,
            id: savedData.id,
          });
          return tool;
        }
        throw new FetchError(`Data does not exist`, rawData, 500);
      }
      const tool = await updateOrCreateTool(toCreate);
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

const processGsheet = async (req, res) => {
  try {
    const { update } = req.query;
    const isUpdate = Number(update);
    const data = await processSheet(isUpdate);
    return res.status(200).json({
      message: `${isUpdate ? "UPDATE" : "CREATE"} PROCESS SUCCEEDED`,
      data,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default processGsheet;
