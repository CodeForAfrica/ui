import Airtable from "airtable";

import {
  processTool,
  processContributor,
  processOrganisation,
} from "./processData";

import fetchJson from "@/charterafrica/utils/fetchJson";

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_TOKEN,
});

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

async function fetchData(url) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
  };

  const cached = getFromCache(url);
  if (cached) {
    return cached;
  }

  const value = await fetchJson.get(url, { headers });
  cache[url] = { value, lastUpdated: new Date() };
  return value;
}

const BASES_URL = "https://api.airtable.com/v0/meta/bases";

async function bases() {
  const url = BASES_URL;
  return fetchData(url);
}

async function schema(baseId) {
  const url = `${BASES_URL}/${baseId}/tables`;
  return fetchData(url);
}

async function table(baseId, tableId) {
  const base = airtable.base(baseId);
  return base(tableId).select().all();
}

async function data(config) {
  const {
    baseId,
    schema: {
      toolTableId,
      organisationTableId,
      contributorTableId,
      partnersTableId,
      socialMediaTableId,
    },
  } = config;
  const airtableTools = await table(baseId, toolTableId);
  const airtableContributors = await table(baseId, contributorTableId);
  const airtableOrganisations = await table(baseId, organisationTableId);
  const socialMedia = await table(baseId, socialMediaTableId);
  const partners = await table(baseId, partnersTableId);
  const tableData = { socialMedia, partners };
  const tools = airtableTools.map((item) =>
    processTool(
      {
        ...item.fields,
        id: item.id,
      },
      config,
      tableData
    )
  );
  const contributors = airtableContributors.map((item) =>
    processContributor(
      {
        ...item.fields,
        id: item.id,
      },
      config,
      tableData
    )
  );
  const organisations = airtableOrganisations.map((item) =>
    processOrganisation(
      {
        ...item.fields,
        id: item.id,
      },
      config,
      tableData
    )
  );
  return { tools, organisations, contributors, socialMedia, partners };
}

export default { bases, schema, table, data };
