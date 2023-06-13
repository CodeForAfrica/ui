import Airtable from "airtable";

import { CONTRIBUTORS_COLLECTION } from "@/charterafrica/lib/ecosystem/models";
import api from "@/charterafrica/lib/payload";
import fetchJson, { FetchError } from "@/charterafrica/utils/fetchJson";

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_TOKEN,
});

function getter(data, key) {
  return key ? data?.[key] : null;
}

export const getListFromAirtable = async ({ baseId, tableIdOrName }) => {
  const base = airtable.base(baseId);
  return base(tableIdOrName).select().all();
};

export const processOrganisationFromAirTable = async (data, config) => {
  const {
    schema: { organisationTableColumns },
  } = config;
  const description = {
    en: getter(data, organisationTableColumns.description.en),
    pt: getter(data, organisationTableColumns.description.pt),
    fr: getter(data, organisationTableColumns.description.fr),
  };
  const unLocalizedData = {
    airtableId: data.id,
    externalId: getter(data, organisationTableColumns.slug),
    type: getter(data, organisationTableColumns.type),
    repoLink: getter(data, organisationTableColumns.source.url),
    donors: [], // data.Donors, UPDATE when source is sanitized
    partners: [], // data.Partners,
  };
  if (!unLocalizedData.externalId) {
    throw new FetchError(`Missing external ID for ${data.id}`, data, 500);
  }
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

export const processContributorFromAirtable = async (data, config) => {
  const {
    schema: { contributorTableColumns },
  } = config;
  const description = {
    en: getter(data, contributorTableColumns.description.en),
    pt: getter(data, contributorTableColumns.description.pt),
    fr: getter(data, contributorTableColumns.description.fr),
  };
  const defaultData = {
    airtableId: data.id,
    externalId: getter(data, contributorTableColumns.slug),
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

export const processToolFromAirtable = async (data, config) => {
  const {
    schema: { toolTableColumns },
  } = config;
  const theme = {
    en: getter(data, toolTableColumns.theme.en)?.[0],
    pt: getter(data, toolTableColumns.theme.pt)?.[0],
    fr: getter(data, toolTableColumns.theme.fr)?.[0],
  };
  const description = {
    en: getter(data, toolTableColumns.description.en),
    pt: getter(data, toolTableColumns.description.pt),
    fr: getter(data, toolTableColumns.description.fr),
  };
  const { docs: contrib } = await api.getCollection(CONTRIBUTORS_COLLECTION, {
    where: {
      airtableId: {
        in: getter(data, toolTableColumns.contributors)?.join(","),
      },
    },
  });
  const operatingCountries = [];
  const homeCountry = getter(data, toolTableColumns.homeCountry);
  const defaultData = {
    airtableId: data.id,
    externalId: getter(data, toolTableColumns.slug) || " ",
    repoLink: getter(data, toolTableColumns.source.url),
    name: getter(data, toolTableColumns.name),
    link: getter(data, toolTableColumns.url),
    operatingCountries,
    contributors: contrib.map(({ id }) => id),
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

export async function schema(req) {
  const { url } = req.query;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
  };
  return fetchJson.get(`https://api.airtable.com/v0${url}`, {
    headers,
  });
}
