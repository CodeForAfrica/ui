import api from "../payload";

import {
  getListFromAirtable,
  getBases,
  processToolFromAirtable,
  processOrganisationFromAirTable,
  processContributorFromAirtable,
} from "@/charterafrica/lib/ecosystem/airtable";
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
    // Only get git data if not exist in database
    return createCollection(TOOL_COLLECTION, airtableData, config);
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
    return createCollection(ORGANIZATION_COLLECTION, airtableData, config);
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
    return createCollection(CONTRIBUTORS_COLLECTION, airtableData, config);
  });
  return Promise.allSettled(processedContributors);
};

export const updateEcosystemContent = async (req, res) => {
  // For all list in database query Github API. using ETAG
  res.status(200).json({});
};

const execute = async () => {
  const config = await api.findGlobal(ECOSYSTEM_GLOBAL, {});
  const bases = await getBases(config);
  await processContributors(config, bases);
  await processTools(config, bases);
  await processOrganisations(config, bases);
};

export const updateEcosystemList = async () => {
  execute();
  return { message: "PROCESS_STARTED" };
};