import Airtable from "airtable";

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

async function bases() {
  const url = `https://api.airtable.com/v0/meta/bases`;
  return fetchData(url);
}

async function schema(baseId) {
  const url = `https://api.airtable.com/v0/meta/bases/${baseId}/tables`;
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
  const tools = await airtable.table(baseId, toolTableId);
  const contributors = await airtable.table(baseId, contributorTableId);
  const organisations = await airtable.table(baseId, organisationTableId);
  const socialMedia = await airtable.table(baseId, socialMediaTableId);
  const partners = await airtable.table(baseId, partnersTableId);
  return { tools, organisations, contributors, socialMedia, partners };
}

export default { bases, schema, table, data };
