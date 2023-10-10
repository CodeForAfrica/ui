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
    },
  } = config;
  const toolsData = await table(baseId, toolTableId);
  const contributorsData = await table(baseId, contributorTableId);
  const organisationsData = await table(baseId, organisationTableId);
  const partnersData = await table(baseId, partnersTableId);
  const tableData = { partnersData };
  const tools = toolsData
    .map((item) => processTool(item, config, tableData))
    .filter(Boolean);
  const contributors = contributorsData
    .map((item) => processContributor(item, config, tableData))
    .filter(Boolean);
  const organisations = organisationsData
    .map((item) => processOrganisation(item, config, tableData))
    .filter(Boolean);
  return {
    tools,
    organisations,
    contributors,
    partners: partnersData,
  };
}

export default { bases, schema, table, data };
