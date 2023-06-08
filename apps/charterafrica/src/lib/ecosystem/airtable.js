import Airtable from "airtable";

import {
  ORGANIZATION_COLLECTION,
  CONTRIBUTORS_COLLECTION,
  ECOSYSTEM_CONFIG,
} from "@/charterafrica/lib/ecosystem/models";
import api from "@/charterafrica/lib/payload";
import fetchJson from "@/charterafrica/utils/fetchJson";

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_TOKEN,
});

export const getListFromAirtable = async ({ baseId, tableIdOrName }) => {
  const base = airtable.base(baseId);
  return base(tableIdOrName).select().all();
};

export const processOrganisationFromAirTable = async (data) => {
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

export const processContributorFromAirtable = async (data) => {
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

export const processToolFromAirtable = async (data) => {
  const config = await api.findGlobal(ECOSYSTEM_CONFIG, {});
  const theme = {
    en: data[config.toolTheme.english]?.[0],
    pt: data[config.toolTheme.portuguese]?.[0],
    fr: data[config.toolTheme.french]?.[0],
  };
  const description = {
    en: data[config.toolsDescription.english],
    pt: data[config.toolsDescription.portuguese],
    fr: data[config.toolsDescription.french],
  };
  const { docs: contrib } = await api.getCollection(CONTRIBUTORS_COLLECTION, {
    where: { airtableId: { in: data[config.toolContributors]?.join(",") } },
  });
  const { docs: org } = await api.getCollection(ORGANIZATION_COLLECTION, {
    where: { airtableId: { in: data[config.toolOrganisation]?.join(",") } },
  });
  const operatingCountries = [];
  const homeCountry = data[config.homeCountry];
  const defaultData = {
    airtableId: data.id,
    externalId: data[config.toolExternalId] || " ",
    repoLink: data[config.toolRepoLink],
    name: data[config.toolName],
    link: data[config.toolLink],
    operatingCountries,
    contributors: contrib.map(({ id }) => id),
    organisation: org?.[0]?.id,
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

export async function airtableSchema(req) {
  const { url } = req.query;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
  };
  const response = await fetchJson.get(`https://api.airtable.com/v0${url}`, {
    headers,
  });
  return response;
}
