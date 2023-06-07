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

export const updateEcosystemList = async (req, res) => {
  const config = await api.findGlobal(ECOSYSTEM_CONFIG, {});
  const args = {
    baseId: config.airtableBase,
    tableIdOrName: config.toolsTableName,
  };
  const response = await getListFromAirtable(args);
  res.status(200).json(response);
};

export const updateEcosystemContent = async (req, res) => {
  const config = await api.findGlobal(ECOSYSTEM_CONFIG, {});
  const baseId = config.airtableBase;
  const toolTableName = config.toolsTableName;
  const contributorsTableName = config.contributorTableName;
  const organisationTable = config.organisationTableName;
  const contributorsFromAirtTable = await getListFromAirtable({
    baseId,
    tableIdOrName: contributorsTableName,
  });
  const processedContributors = contributorsFromAirtTable.map(async (data) => {
    const airtableData = await processContributorFromAirtable({
      ...data.fields,
      id: data.id,
    });
    return createCollection(CONTRIBUTORS_COLLECTION, airtableData);
  });

  const contributors = await Promise.allSettled(processedContributors);

  const organisationsFromAirtable = await getListFromAirtable({
    baseId,
    tableIdOrName: organisationTable,
  });
  const processedOrganisations = organisationsFromAirtable.map(async (data) => {
    const airtableData = await processOrganisationFromAirTable({
      ...data.fields,
      id: data.id,
    });
    return createCollection(ORGANIZATION_COLLECTION, airtableData);
  });

  const organisations = await Promise.allSettled(processedOrganisations);
  const toolsFromAirtable = await getListFromAirtable({
    baseId,
    tableIdOrName: toolTableName,
  });
  const processedToolPromises = toolsFromAirtable.map(async (data) => {
    const airtableData = await processToolFromAirtable({
      ...data.fields,
      id: data.id,
    });
    return createCollection(TOOL_COLLECTION, airtableData);
  });
  const tools = await Promise.allSettled(processedToolPromises);

  res.status(200).json({ tools, contributors, organisations });
};
