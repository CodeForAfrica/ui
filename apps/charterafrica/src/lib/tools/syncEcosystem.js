import api from "../payload";

import { fetchRepository } from "./github";
import {
  updateOrCreateTool,
  TOOL_COLLECTION,
  DIGITAL_DEMOCRACY_ECOSYSTEM,
} from "./models";

import mockData from "@/charterafrica/lib/data/_mock/gitData";
import { FetchError } from "@/charterafrica/utils/fetchJson";

const processRepository = (data, { topic, externalId, name, location }) => {
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
    name,
    description: data?.description,
    link: data?.homepageUrl,
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
    externalUpdatedAt: new Date(data.updatedAt),
    deletedAt: null,
  };
  return tool;
};

const getDataFromSource = ({ toolGithub }) => {
  const data = mockData;
  const unique = Object.values(
    data.reduce((acc, obj) => {
      acc[obj[toolGithub]] = obj;
      return acc;
    }, {})
  );
  return unique.map((item) => {
    const externalId = item[toolGithub]
      ?.replace(/^https?:\/\/github\.com\//, "")
      .replace(/\/$/, "");
    return {
      ...item,
      externalId,
    };
  });
};

export const updateEcosystemResource = async () => {
  const { docs } = await api.getCollection(TOOL_COLLECTION);
  const toProcess = docs.map(async (rawData) => {
    const { externalId, id } = rawData;
    let [repositoryOwner, repositoryName] = externalId.split("/");
    repositoryOwner = repositoryOwner?.trim();
    repositoryName = repositoryName?.trim();
    if (repositoryOwner && repositoryName) {
      const gitData = await fetchRepository({
        repositoryOwner,
        repositoryName,
      });
      const toCreate = processRepository(gitData, rawData);
      const tool = await updateOrCreateTool({ ...toCreate, id });
      return tool;
    }
    throw new FetchError(`${externalId} is invalid`, rawData, 500);
  });
  const promises = await Promise.allSettled(toProcess);
  const completed = promises
    .filter((p) => p.status === "fulfilled")
    .map((p) => p.value);
  // TODO Handle errors
  const rejected = promises.filter((p) => p.status === "rejected");

  return { completed, rejected };
};

export const createEcosystemResource = async () => {
  const { columnMappings } = await api.findGlobal(
    DIGITAL_DEMOCRACY_ECOSYSTEM,
    {}
  );
  const { toolDescription, toolName, toolTopic, toolLocation, toolLink } =
    columnMappings;

  const data = getDataFromSource(columnMappings);
  const dataIds = data.map(({ externalId }) => externalId).join(",");
  const { docs: toDelete } = await api.getCollection(TOOL_COLLECTION, {
    where: {
      externalId: {
        not_in: dataIds,
      },
    },
  });
  Promise.all(
    toDelete.map(async ({ id }) => {
      await api.updateCollection(TOOL_COLLECTION, id, {
        deletedAt: new Date(),
      });
    })
  );
  const toProcess = data.map(async (rawData, i) => {
    const { externalId } = rawData;
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
        link: rawData[toolLink],
      };
      const { docs } = await api.getCollection(TOOL_COLLECTION, {
        where: {
          externalId: { equals: externalId },
        },
      });
      if (docs.length) {
        const savedData = docs[0];
        const toCreate = {
          ...savedData,
          location: dataFromSheet.location,
          subject: dataFromSheet.topic,
          description: dataFromSheet.description,
          name: dataFromSheet.name,
          deletedAt: null,
        };
        const tool = await updateOrCreateTool(toCreate);
        return tool;
      }
      const gitData = await fetchRepository({
        repositoryOwner,
        repositoryName,
      });
      const toCreate = processRepository(gitData, dataFromSheet);
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
