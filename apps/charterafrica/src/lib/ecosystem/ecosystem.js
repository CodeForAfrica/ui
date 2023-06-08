import {
  getListFromAirtable,
  processToolFromAirtable,
  processOrganisationFromAirTable,
  processContributorFromAirtable,
} from "@/charterafrica/lib/ecosystem/airtable";
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
    // Only get git data if not exist in database
    return createCollection(TOOL_COLLECTION, airtableData);
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
    // Only get git data if not exist in database
    return createCollection(ORGANIZATION_COLLECTION, airtableData);
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
    // Only get git data if not exist in database
    return createCollection(CONTRIBUTORS_COLLECTION, airtableData);
  });
  return Promise.allSettled(processedContributors);
};

export const updateEcosystemList = async (req, res) => {
  // For all list in database query Github API. using ETAG
  res.status(200).json({});
};
export const updateEcosystemContent = async (req, res) => {
  const contributors = await processContributors();
  const organisations = await processOrganisations();
  const tools = await processTools();

  res.status(200).json({ tools, contributors, organisations });
};
