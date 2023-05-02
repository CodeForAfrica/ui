import NodeCache from "node-cache";

import fetchJson from "@/charterafrica/utils/fetchJson";

const BASE_DOCUMENTS_URL = "https://openafrica.net/api/3/action/";
const cache = new NodeCache({ stdTTL: 60 * 60 });

async function packageSearch(params) {
  try {
    const response = await fetchJson.get(
      `${BASE_DOCUMENTS_URL}package_search`,
      {
        params,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}

function formatDatasets(data) {
  const { result: { count, facets: { tags, groups }, results } = {} } =
    data || {};

  const documents = [];
  const datasets = results?.map((dataset) => {
    const {
      author,
      metadata_created: created,
      metadata_modified: updated,
      name,
      notes,
      resources,
      title,
      type,
    } = dataset;

    const formattedResources = resources?.map(
      ({
        created: resourceCreated,
        id,
        last_modified: resourceUpdated,
        url,
        format,
        name: resourceName,
        description,
      }) => ({
        author,
        created: resourceCreated,
        description: description || notes,
        format,
        id,
        name: resourceName,
        updated: resourceUpdated,
        url,
      })
    );
    documents.push(...formattedResources);

    const formats = [
      ...new Set(formattedResources?.map((resource) => resource.format)),
    ];

    return {
      author,
      created,
      formats,
      name,
      notes,
      title,
      type,
      updated,
    };
  });

  const countries = Object.keys(groups || {}).sort((a, b) =>
    a.localeCompare(b)
  );
  const tagsList = Object.keys(tags || {}).sort((a, b) => a.localeCompare(b));

  return { count, datasets, documents, countries, tags: tagsList };
}

export default async function fetchDatasets(organization, query = {}) {
  const cacheKey = `organization-datasets-${organization}-${JSON.stringify(
    query
  )}`;

  const cachedDatasets = cache.get(cacheKey);
  if (cachedDatasets) {
    return cachedDatasets;
  }

  const { tags = [], countries = [], ...other } = query;
  const tagsQuery = tags.length
    ? `tags:(${tags.map((tag) => `"${tag}"`).join(" OR ")})`
    : "";
  const countriesQuery = countries.length
    ? `groups:(${countries.map((country) => `"${country}"`).join(" OR ")})`
    : "";
  const organizationQuery = `organization:${organization}`;
  const filterQuery = [tagsQuery, countriesQuery, organizationQuery]
    .filter(Boolean)
    .join(" AND ");

  const params = {
    ...other,
    fq: filterQuery,
    "facet.field": '["tags", "groups"]',
  };
  try {
    const response = await packageSearch(params);
    const formattedData = formatDatasets(response);
    cache.set(cacheKey, formattedData);
    return formattedData;
  } catch (error) {
    return error;
  }
}

export async function getOrganizationStatistics(organization) {
  const statsCacheKey = `organization-stats-${organization}`;
  const cachedStats = cache.get(statsCacheKey);
  if (cachedStats) {
    return cachedStats;
  }

  const params = {
    rows: 1000,
    start: 0,
    fq: `organization:${organization}`,
  };

  try {
    const response = await packageSearch(params);
    const allDatasets = [...response.result.results];
    const { count: datasetCount } = response.result;

    const promises = [];
    for (let i = params.rows; i < datasetCount; i += params.rows) {
      const nextParams = { ...params, start: i };
      promises.push(packageSearch(nextParams));
    }

    const paginatedResponses = await Promise.all(promises);
    paginatedResponses.forEach((paginatedResponse) => {
      allDatasets.push(...paginatedResponse.result.results);
    });

    const documentsCount = allDatasets.reduce((acc, dataset) => {
      return acc + dataset.resources.length;
    }, 0);

    const stats = {
      datasetCount,
      documentsCount,
    };

    cache.set(statsCacheKey, stats);
    return stats;
  } catch (error) {
    return error;
  }
}
