import getListFromAirtable from "@/charterafrica/lib/ecosystem/airtable";
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

const processOrganisationFromAirTable = async (data) => {
  const config = await api.findGlobal(ECOSYSTEM_CONFIG, {});
  const description = {
    en: data[config.organisationDescription.english],
    pt: data[config.organisationDescription.portuguese],
    fr: data[config.organisationDescription.french],
  };
  const unLocalizedData = {
    airtableId: data.id,
    externalId: data[config.organisationUserName] || data.id,
    name: data[config.organisationName]?.[0],
    type: data[config.organisationType],
    repoLink: data[config.organisationRepoLink],
    donors: [], // data.Donors, UPDATE when source is sanitized
    partners: [], // data.Partners,
  };
  return {
    en: {
      ...unLocalizedData,
      description: description.en,
    },
    fr: {
      ...unLocalizedData,
      description: description.fr,
    },
    pt: {
      ...unLocalizedData,
      description: description.pt,
    },
  };
};

const processContributorFromAirtable = async (data) => {
  const config = await api.findGlobal(ECOSYSTEM_CONFIG, {});
  const description = {
    en: data[config.contributorDescription.english],
    pt: data[config.contributorDescription.portuguese],
    fr: data[config.contributorDescription.french],
  };
  const defaultData = {
    airtableId: data.id,
    externalId: data[config.contributorUserName] || data.id,
    repoLink: `https://github.com/${data.id}`,
    donors: [], // data.Donors,
    partners: [], // data.Partners,
  };
  return {
    en: {
      ...defaultData,
      description: description.en,
    },
    fr: {
      ...defaultData,
      description: description.fr,
    },
    pt: {
      ...defaultData,
      description: description.pt,
    },
  };
};

const processToolFromAirtable = async (data) => {
  const config = await api.findGlobal(ECOSYSTEM_CONFIG, {});
  const theme = {
    en: data[config.toolTheme.english]?.[0],
    pt: data[config.toolTheme.portuguese]?.[0],
    fr: data[config.toolTheme.french]?.[0],
  };
  const description = {
    en: data[config.toolsDescription.english] || "",
    pt: data[config.toolsDescription.portuguese] || "",
    fr: data[config.toolsDescription.french] || "",
  };

  const operatingCountries = [];
  const homeCountry = data[config.homeCountry];
  const defaultData = {
    airtableId: data.id,
    externalId: data[config.toolExternalId],
    repoLink: data[config.toolRepoLink],
    name: data[config.toolName],
    link: data[config.toolLink],
    operatingCountries,
    contributors: data[config.toolContributors],
    organisation: data[config.toolOrganisation]?.[0],
    donors: [], // data.Donors,
    partners: [], //  data.Partners,
    homeCountry,
    otherSocialMedia: [],
  };

  return {
    en: {
      ...defaultData,
      description: description.en,
      theme: theme.en,
    },
    fr: {
      ...defaultData,
      description: description.fr,
      theme: theme.fr,
    },
    pt: {
      ...defaultData,
      description: description.pt,
      theme: theme.pt,
    },
  };
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
