import * as Sentry from "@sentry/nextjs";
import Airtable from "airtable";

import {
  CONTRIBUTORS_COLLECTION,
  TOOL_COLLECTION,
} from "@/charterafrica/lib/ecosystem/models";
import api from "@/charterafrica/lib/payload";
import fetchJson, { FetchError } from "@/charterafrica/utils/fetchJson";

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_TOKEN,
});

function getter(data, key) {
  return key ? data?.[key] : null;
}

export async function getBases(config) {
  const {
    baseId,
    schema: { partnersTableId, socialMediaTableId },
  } = config;
  const partnerTableBase = airtable.base(baseId)(partnersTableId);
  const socialMediaTableBase = airtable.base(baseId)(socialMediaTableId);
  return {
    partnerTableBase,
    socialMediaTableBase,
  };
}

async function mapSupportersToFields(supporters, config, base) {
  const {
    schema: { partnerTableColumns },
  } = config;
  const { name, url, logo } = partnerTableColumns;
  const promises = supporters.map(async (id) => {
    try {
      const { fields } = await base.find(id);
      return {
        name: getter(fields, name),
        website: getter(fields, url),
        logo: getter(fields, logo),
      };
    } catch (error) {
      Sentry.captureMessage(error.message);
      return null;
    }
  });
  const sanitized = await Promise.all(promises);
  return sanitized.filter(Boolean);
}

async function getToolsPerAirtableId(ids) {
  if (!ids || !ids?.length) {
    return [];
  }
  const { docs } = await api.getCollection(TOOL_COLLECTION, {
    where: {
      airtableId: {
        in: ids?.join(","),
      },
    },
  });
  return docs.map(({ id }) => id);
}

async function mapSocialMediaToFields(socialMedia, config, base) {
  const {
    schema: { socialMediaTableColumns },
  } = config;
  const { name, url } = socialMediaTableColumns;
  const promises = socialMedia.map(async (id) => {
    try {
      const { fields } = await base.find(id);
      return {
        name: getter(fields, name),
        website: getter(fields, url),
      };
    } catch (error) {
      Sentry.captureMessage(error.message);
      return null;
    }
  });
  const sanitized = await Promise.all(promises);
  return sanitized.filter(Boolean);
}

export const getListFromAirtable = async ({ baseId, tableIdOrName }) => {
  const base = airtable.base(baseId);
  return base(tableIdOrName).select().all();
};

export const processOrganisationFromAirTable = async (
  data,
  config,
  { partnerTableBase, socialMediaTableBase }
) => {
  const {
    schema: { organisationTableColumns },
  } = config;
  const description = {
    en: getter(data, organisationTableColumns.description.en),
    pt: getter(data, organisationTableColumns.description.pt),
    fr: getter(data, organisationTableColumns.description.fr),
  };
  const partners = await mapSupportersToFields(
    getter(data, organisationTableColumns.partners) || [],
    config
  );
  const supporters = await mapSupportersToFields(
    getter(data, organisationTableColumns.supporters) || [],
    config,
    partnerTableBase
  );
  const socialMedia = await mapSocialMediaToFields(
    getter(data, organisationTableColumns.socialMedia) || [],
    config,
    socialMediaTableBase
  );
  const tools = await getToolsPerAirtableId(
    getter(data, organisationTableColumns.tools)
  );
  const unLocalizedData = {
    airtableId: data.id,
    avatarUrl: getter(data, organisationTableColumns.avatarUrl)?.[0]?.url,
    externalId: getter(data, organisationTableColumns.slug),
    type: getter(data, organisationTableColumns.type),
    repoLink: getter(data, organisationTableColumns.source.url),
    supporters,
    partners,
    socialMedia,
    tools,
  };
  if (!unLocalizedData.externalId) {
    const message = `Missing external ID for ${data.id}`;
    Sentry.captureMessage(message);
    throw new FetchError(message, data, 500);
  }
  if (!tools.length) {
    const message = `Organisation ${data.id} is not assigned to any tool and has been skipped`;
    Sentry.captureMessage(message);
    throw new FetchError(message, data, 500);
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
  const socialMedia = await mapSocialMediaToFields(
    getter(data, contributorTableColumns.socialMedia) || [],
    config
  );
  const description = {
    en: getter(data, contributorTableColumns.description.en),
    pt: getter(data, contributorTableColumns.description.pt),
    fr: getter(data, contributorTableColumns.description.fr),
  };
  const defaultData = {
    airtableId: data.id,
    avatarUrl: getter(data, contributorTableColumns.avatarUrl)?.[0]?.url,
    externalId: getter(data, contributorTableColumns.slug),
    repoLink: `https://github.com/${getter(
      data,
      contributorTableColumns.slug
    )}`,
    socialMedia,
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

export const processToolFromAirtable = async (
  data,
  config,
  { partnerTableBase, socialMediaTableBase }
) => {
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
  const operatingCountries = getter(data, toolTableColumns.operatingCountries);
  const homeCountry = getter(data, toolTableColumns.homeCountry);
  const partners = await mapSupportersToFields(
    getter(data, toolTableColumns.partners) || [],
    config
  );
  const supporters = await mapSupportersToFields(
    getter(data, toolTableColumns.supporters) || [],
    config,
    partnerTableBase
  );
  const socialMedia = await mapSocialMediaToFields(
    getter(data, toolTableColumns.socialMedia) || [],
    config,
    socialMediaTableBase
  );
  const defaultData = {
    airtableId: data.id,
    avatarUrl: getter(data, toolTableColumns.avatarUrl)?.[0]?.url,
    externalId: getter(data, toolTableColumns.slug) || " ",
    repoLink: getter(data, toolTableColumns.source.url),
    name: getter(data, toolTableColumns.name),
    link: getter(data, toolTableColumns.url),
    operatingCountries,
    contributors: contrib.map(({ id }) => id),
    supporters,
    partners,
    homeCountry,
    socialMedia,
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

const cache = {};

function getFromCache(key) {
  const rawData = cache[key];
  if (rawData) {
    const { lastUpdated, value } = rawData;
    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
    if (fiveMinutesAgo < lastUpdated) {
      return value;
    }
  }
  return null;
}

export async function schema(req) {
  const { url } = req.query;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
  };
  const cached = getFromCache(url);
  if (cached) {
    return cached;
  }
  const value = fetchJson.get(`https://api.airtable.com/v0${url}`, {
    headers,
  });
  cache[url] = { value, lastUpdated: new Date() };
  return value;
}
