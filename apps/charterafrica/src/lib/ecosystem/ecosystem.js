import api from "../payload";

import {
  getListFromAirtable,
  getBases,
  processToolFromAirtable,
  processOrganisationFromAirTable,
  processContributorFromAirtable,
} from "@/charterafrica/lib/ecosystem/airtable";
import {
  getToolfromCacheOrGithub,
  getOrganisationFromCacheOrGithub,
  getContributorFromCacheOrGithub,
  processGithubTool,
  processGithubOrganisation,
  processGithubContributor,
} from "@/charterafrica/lib/ecosystem/github";
import {
  createCollection,
  ORGANIZATION_COLLECTION,
  CONTRIBUTORS_COLLECTION,
  TOOL_COLLECTION,
  ECOSYSTEM_GLOBAL,
} from "@/charterafrica/lib/ecosystem/models";

const bulkMarkDeleted = async (collection, fromSource) => {
  const dataIds = fromSource.map(({ id }) => id).join(",");
  const { docs: toDelete } = await api.getCollection(collection, {
    where: {
      airtableId: {
        not_in: dataIds,
      },
    },
  });
  Promise.all(
    toDelete.map(async ({ id }) => {
      await api.updateCollection(collection, id, {
        deletedAt: new Date(),
      });
    })
  );
};
const processTools = async (config, bases) => {
  const {
    baseId,
    schema: { toolTableId: tableIdOrName },
  } = config;
  const toolsFromAirtable = await getListFromAirtable({
    baseId,
    tableIdOrName,
  });
  await bulkMarkDeleted(TOOL_COLLECTION, toolsFromAirtable);
  const processedToolPromises = toolsFromAirtable.map(async (data) => {
    const airtableData = await processToolFromAirtable(
      {
        ...data.fields,
        id: data.id,
      },
      config,
      bases
    );
    const gitData = await getToolfromCacheOrGithub(airtableData.en);
    const toCreate = {
      en: {
        ...gitData,
        ...airtableData.en,
      },
      pt: {
        ...gitData,
        ...airtableData.pt,
      },
      fr: {
        ...gitData,
        ...airtableData.fr,
      },
    };
    return createCollection(TOOL_COLLECTION, toCreate, config);
  });
  return Promise.allSettled(processedToolPromises);
};

const processOrganisations = async (config, bases) => {
  const {
    baseId,
    schema: { organisationTableId: tableIdOrName },
  } = config;
  const organisationsFromAirtable = await getListFromAirtable({
    baseId,
    tableIdOrName,
  });
  await bulkMarkDeleted(ORGANIZATION_COLLECTION, organisationsFromAirtable);
  const processedOrgPromises = organisationsFromAirtable.map(async (data) => {
    const airtableData = await processOrganisationFromAirTable(
      {
        ...data.fields,
        id: data.id,
      },
      config,
      bases
    );
    // Only get git data if not exist in database
    const gitData = await getOrganisationFromCacheOrGithub(airtableData.en);
    const toCreate = {
      en: {
        ...gitData,
        ...airtableData.en,
      },
      pt: {
        ...gitData,
        ...airtableData.pt,
      },
      fr: {
        ...gitData,
        ...airtableData.fr,
      },
    };
    return createCollection(ORGANIZATION_COLLECTION, toCreate, config);
  });
  return Promise.allSettled(processedOrgPromises);
};

const processContributors = async (config, bases) => {
  const {
    baseId,
    schema: { contributorTableId: tableIdOrName },
  } = config;
  const contributorsFromAirtTable = await getListFromAirtable({
    baseId,
    tableIdOrName,
  });
  await bulkMarkDeleted(CONTRIBUTORS_COLLECTION, contributorsFromAirtTable);
  const processedContributors = contributorsFromAirtTable.map(async (data) => {
    const airtableData = await processContributorFromAirtable(
      {
        ...data.fields,
        id: data.id,
      },
      config,
      bases
    );
    // Only get git data if not exist in database
    const gitData = await getContributorFromCacheOrGithub(airtableData.en);
    const toCreate = {
      en: {
        ...gitData,
        ...airtableData.en,
      },
      pt: {
        ...gitData,
        ...airtableData.pt,
      },
      fr: {
        ...gitData,
        ...airtableData.fr,
      },
    };
    return createCollection(CONTRIBUTORS_COLLECTION, toCreate, config);
  });
  return Promise.allSettled(processedContributors);
};

async function updateContributorContent() {
  const { docs } = await api.getCollection(CONTRIBUTORS_COLLECTION);
  const updatePromises = docs.map(async (item) => {
    const updated = await processGithubContributor(item);
    return api.updateCollection(CONTRIBUTORS_COLLECTION, item.id, updated);
  });
  return Promise.allSettled(updatePromises);
}

async function updateOrganisationContent() {
  const { docs } = await api.getCollection(ORGANIZATION_COLLECTION);
  const updatePromises = docs.map(async (item) => {
    const updated = await processGithubOrganisation(item);
    return api.updateCollection(ORGANIZATION_COLLECTION, item.id, updated);
  });
  return Promise.allSettled(updatePromises);
}

async function updateToolContent() {
  const { docs } = await api.getCollection(TOOL_COLLECTION);
  const updatePromises = docs.map(async (item) => {
    const updated = await processGithubTool(item);
    return api.updateCollection(TOOL_COLLECTION, item.id, updated);
  });
  return Promise.allSettled(updatePromises);
}

export async function updateEcosystemContent() {
  const contributors = await updateContributorContent();
  const organisations = await updateOrganisationContent();
  const tools = await updateToolContent();
  return { tools, contributors, organisations };
}

async function execute() {
  const config = await api.findGlobal(ECOSYSTEM_GLOBAL, {});
  const bases = await getBases(config);
  await processContributors(config, bases);
  await processTools(config, bases);
  await processOrganisations(config, bases);
}

export const updateEcosystemList = async () => {
  execute();
  return { message: "PROCESS_STARTED" };
};
