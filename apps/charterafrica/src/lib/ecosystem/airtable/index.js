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

async function data(baseId, tableId) {
  const base = airtable.base(baseId);
  return base(tableId).select().all();
}

export default { bases, schema, data };
