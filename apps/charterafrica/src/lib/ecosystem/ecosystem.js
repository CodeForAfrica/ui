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
    const gitData = await processGithubContributor(airtableData.en);
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
    const gitData = await processGithubOrganisation(airtableData.en);
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
    const gitData = await processGithubTool(airtableData.en);
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
  const tools = await Promise.allSettled(processedToolPromises);

  res.status(200).json({ tools, contributors, organisations });
};
