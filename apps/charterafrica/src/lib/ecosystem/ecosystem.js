import * as Sentry from "@sentry/nextjs";

import api from "../payload";

import {
  getAirtableData,
  processToolFromAirtable,
  processOrganisationFromAirTable,
  processContributorFromAirtable,
} from "@/charterafrica/lib/ecosystem/airtable.old";
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
      try {
        await api.updateCollection(collection, id, {
          deletedAt: new Date(),
        });
      } catch (error) {
        Sentry.captureMessage(error.message);
      }
    })
  );
};
const processTools = async (config, tableData) => {
  const { tools: toolsFromAirtable } = tableData;
  await bulkMarkDeleted(TOOL_COLLECTION, toolsFromAirtable);
  const processedToolPromises = toolsFromAirtable.map(async (data) => {
    const airtableData = await processToolFromAirtable(
      {
        ...data.fields,
        id: data.id,
      },
      config,
      tableData
    );
    // Only get git data if not exist in database
    return createCollection(TOOL_COLLECTION, airtableData, config);
  });
  return Promise.allSettled(processedToolPromises);
};

const processOrganisations = async (config, tableData) => {
  const { organisations: organisationsFromAirtable } = tableData;
  await bulkMarkDeleted(ORGANIZATION_COLLECTION, organisationsFromAirtable);
  const processedOrgPromises = organisationsFromAirtable.map(async (data) => {
    const airtableData = await processOrganisationFromAirTable(
      {
        ...data.fields,
        id: data.id,
      },
      config,
      tableData
    );
    // Only get git data if not exist in database
    return createCollection(ORGANIZATION_COLLECTION, airtableData, config);
  });
  return Promise.allSettled(processedOrgPromises);
};

const processContributors = async (config, tableData) => {
  const { contributors: contributorsFromAirtTable } = tableData;
  await bulkMarkDeleted(CONTRIBUTORS_COLLECTION, contributorsFromAirtTable);
  const processedContributors = contributorsFromAirtTable.map(async (data) => {
    const airtableData = await processContributorFromAirtable(
      {
        ...data.fields,
        id: data.id,
      },
      config,
      tableData
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
  Sentry.captureEvent({
    message: `Update Ecosystem List process started at ${new Date().toString()}`,
    level: "info",
  });
  const config = await api.findGlobal(ECOSYSTEM_GLOBAL, {});
  const tableData = await getAirtableData(config);
  await processContributors(config, tableData);
  await processTools(config, tableData);
  await processOrganisations(config, tableData);
  Sentry.captureEvent({
    message: `Update Ecosystem List process completed ${new Date().toString()}`,
    level: "info",
  });
};

export const updateEcosystemList = async () => {
  execute();
  return { message: "PROCESS_STARTED" };
};
