import getListFromAirtable from "@/charterafrica/lib/ecosystem/airtable";
import {
  createCollection,
  ORGANIZATION_COLLECTION,
  CONTRIBUTORS_COLLECTION,
  TOOL_COLLECTION,
} from "@/charterafrica/lib/ecosystem/models";

export const updateEcosystemList = async (req, res) => {
  const args = {
    baseId: "appDuwqg5qeS4h5ji",
    tableIdOrName: "tblBhgz5VmG9IZVe4",
  };
  const response = await getListFromAirtable(args);
  res.status(200).json(response);
};

const processOrganisationFromAirTable = async (data) => {
  const description = {
    en: data["Organisation Description"],
    pt: data["Organisation Description(Portuguese)"],
    fr: data["Organisation Description(French)"],
  };
  const unLocalizedData = {
    airtableId: data.id,
    externalId: data["Organisation Username"] || data.id,
    name: data["Organisation Name"]?.[0],
    type: data["Organisation Type"],
    repoLink: data["Organisation Github"],
    donors: [], // data.Donors,
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
  const description = {
    en: data["Contributors Description"],
    pt: data["Contributors Description(Portuguese)"],
    fr: data["Contributors Description(French)"],
  };
  const defaultData = {
    airtableId: data.id,
    externalId: data["Contributors Username"] || data.id,
    type: data["Organisation Type"],
    repoLink: data["Organisation Github"],
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
  const theme = {
    en: data.Theme?.[0],
    pt: data["Theme(Portuguese)"]?.[0],
    fr: data["Theme(French)"]?.[0],
  };
  const description = {
    en: data["Tool Description"] || "",
    pt: data["Tool Description(Portuguese)"] || "",
    fr: data["Tool Description(French)"] || "",
  };
  const operatingCountries = [];
  const homeCountry = data["Tool Location"];
  const defaultData = {
    airtableId: data.id,
    externalId: data["Tool Github"],
    repoLink: data["Tool Github"],
    name: data["Tool Name"],
    link: data["Tool Link"],
    operatingCountries,
    contributors: data["Contributors Table 2"],
    organisation: data["Organisation Table"]?.[0],
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
  const baseId = "appDuwqg5qeS4h5ji";
  const toolTableName = "Tools Table";
  const contributorsTableName = "tblgVBmrpYETy3F51";
  // const donorsTableName = "tblPQVgk6voDcxvtO";
  const organisationTable = "tblPGobbSBkFJaM5p";

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
