import {
  getListFromAirtable,
  processToolFromAirtable,
  processOrganisationFromAirTable,
  processContributorFromAirtable,
} from "@/charterafrica/lib/ecosystem/airtable";
import {
  processGithubTool,
  processGithubOrganisation,
  processGithubContributor,
} from "@/charterafrica/lib/ecosystem/github";
import {
  createCollection,
  ORGANIZATION_COLLECTION,
  CONTRIBUTORS_COLLECTION,
  TOOL_COLLECTION,
  ECOSYSTEM_CONFIG,
} from "@/charterafrica/lib/ecosystem/models";
import api from "@/charterafrica/lib/payload";

const markBulkAsDeleted = async (collection, fromSource) => {
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

async function getToolfromCacheOrGithub(airtableData) {
  const { airtableId } = airtableData;
  const { docs } = await api.getCollection(TOOL_COLLECTION, {
    where: {
      airtableId: { equals: airtableId },
    },
  });
  if (docs.length) {
    return docs?.[0];
  }
  return processGithubTool(airtableData);
}

async function getOrganisationFromCacheOrGithub(airtableData) {
  const { airtableId } = airtableData;
  const { docs } = await api.getCollection(ORGANIZATION_COLLECTION, {
    where: {
      airtableId: { equals: airtableId },
    },
  });
  if (docs.length) {
    return docs?.[0];
  }
  return processGithubOrganisation(airtableData);
}

async function getContributorFromCacheOrGithub(airtableData) {
  const { airtableId } = airtableData;
  const { docs } = await api.getCollection(CONTRIBUTORS_COLLECTION, {
    where: {
      airtableId: { equals: airtableId },
    },
  });
  if (docs.length) {
    return docs?.[0];
  }
  return processGithubContributor(airtableData);
}

const processTools = async () => {
  const { toolsTableName, airtableBase } = await api.findGlobal(
    ECOSYSTEM_CONFIG,
    {}
  );
  const toolsFromAirtable = await getListFromAirtable({
    baseId: airtableBase,
    tableIdOrName: toolsTableName,
  });
  await markBulkAsDeleted(TOOL_COLLECTION, toolsFromAirtable);
  const processedToolPromises = toolsFromAirtable.map(async (data) => {
    const airtableData = await processToolFromAirtable({
      ...data.fields,
      id: data.id,
    });
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
    return createCollection(TOOL_COLLECTION, toCreate);
  });
  return Promise.allSettled(processedToolPromises);
};

const processOrganisations = async () => {
  const { organisationTableName, airtableBase } = await api.findGlobal(
    ECOSYSTEM_CONFIG,
    {}
  );
  const organisationsFromAirtable = await getListFromAirtable({
    baseId: airtableBase,
    tableIdOrName: organisationTableName,
  });
  await markBulkAsDeleted(ORGANIZATION_COLLECTION, organisationsFromAirtable);
  const processedOrgPromises = organisationsFromAirtable.map(async (data) => {
    const airtableData = await processOrganisationFromAirTable({
      ...data.fields,
      id: data.id,
    });
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
    return createCollection(ORGANIZATION_COLLECTION, toCreate);
  });
  return Promise.allSettled(processedOrgPromises);
};

const processContributors = async () => {
  const { contributorTableName, airtableBase } = await api.findGlobal(
    ECOSYSTEM_CONFIG,
    {}
  );
  const contributorsFromAirtTable = await getListFromAirtable({
    baseId: airtableBase,
    tableIdOrName: contributorTableName,
  });
  await markBulkAsDeleted(CONTRIBUTORS_COLLECTION, contributorsFromAirtTable);
  const processedContributors = contributorsFromAirtTable.map(async (data) => {
    const airtableData = await processContributorFromAirtable({
      ...data.fields,
      id: data.id,
    });
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
    return createCollection(CONTRIBUTORS_COLLECTION, toCreate);
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

export const updateEcosystemContent = async () => {
  const contributors = await updateContributorContent();
  const organisations = await updateOrganisationContent();
  const tools = await updateToolContent();
  return { tools, contributors, organisations };
};

export const updateEcosystemList = async () => {
  const contributors = await processContributors();
  const organisations = await processOrganisations();
  const tools = await processTools();
  return { tools, contributors, organisations };
};
