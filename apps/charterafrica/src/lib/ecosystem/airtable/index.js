import Airtable from "airtable";

import {
  processToolFromAirtable,
  processContributorFromAirtable,
  processOrganisationFromAirTable,
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
  const processedTools = airtableTools.map(async (item) =>
    processToolFromAirtable(
      {
        ...item.fields,
        id: item.id,
      },
      config,
      tableData
    )
  );
  const tools = await Promise.all(processedTools);
  const processedContributors = airtableContributors.map(async (item) =>
    processContributorFromAirtable(
      {
        ...item.fields,
        id: item.id,
      },
      config,
      tableData
    )
  );
  const contributors = await Promise.all(processedContributors);
  const processedOrganisations = airtableOrganisations.map(async (item) =>
    processOrganisationFromAirTable(
      {
        ...item.fields,
        id: item.id,
      },
      config,
      tableData
    )
  );
  const organisations = await Promise.all(processedOrganisations);
  return { tools, organisations, contributors, socialMedia, partners };
}

export default { bases, schema, table, data };
