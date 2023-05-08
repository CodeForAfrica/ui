import api from "../payload";

import { fetchRepository } from "./github";
import {
  updateOrCreateTool,
  TOOL_COLLECTION,
  DIGITAL_DEMOCRACY_ECOSYSTEM,
} from "./models";

import mockData from "@/charterafrica/lib/data/_mock/gitData";
import { FetchError } from "@/charterafrica/utils/fetchJson";

const processRepository = (
  data,
  { topic, externalId, description, name, location }
) => {
  const people =
    data?.collaborators?.nodes?.map((person) => ({
      externalId: person?.login,
      fullName: person?.name ?? null,
      username: person?.login ?? null,
      description: person.bio ?? null,
      country: person?.location ?? null,
      twitter: person?.twitterUsername ?? null,
      avatarUrl: person?.avatarUrl ?? null,
      type: person?.type,
      source: "github",
      email: person.email ?? null,
      lastActive: person.updatedAt,
    })) || [];
  const organisation = {
    externalId: data?.owner?.name ?? null,
    type: "Organisation",
    name: data?.owner?.name ?? null,
    description: data?.owner?.description ?? null,
    location: data?.owner?.location ?? null,
    website: data?.owner?.url ?? null,
    twitter: data?.owner?.twitterUsername ?? null,
    avatarUrl: data?.owner?.avatarUrl ?? null,
    email: data?.owner?.email ?? null,
    source: "github",
    lastActive: data.owner.updatedAt,
  };

  const languagesTechSkills = data.languages?.nodes?.map((language) => ({
    language: language?.name,
  }));
  const tool = {
    externalId,
    avatarUrl: data?.openGraphImageUrl ?? null,
    name: data?.name || name || null,
    description,
    link: data?.url ?? null,
    location,
    subject: topic,
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

const syncEcosystem = async (update = false) => {
  const {
    columnMappings: {
      toolLink,
      toolDescription,
      toolName,
      toolTopic,
      toolLocation,
    },
  } = await api.findGlobal(DIGITAL_DEMOCRACY_ECOSYSTEM, {});
  const data = mockData;
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
  const completed = promises
    .filter((p) => p.status === "fulfilled")
    .map((p) => p.value);
  // TODO Handle errors
  const rejected = promises.filter((p) => p.status === "rejected");

  return { completed, rejected };
};

export default syncEcosystem;
