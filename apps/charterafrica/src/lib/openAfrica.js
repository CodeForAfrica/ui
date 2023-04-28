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

async function formatDatasets(data) {
  const {
    result: {
      count,
      facets: { tags: allTags, groups: allCountries },
      results,
    },
  } = data || {};

  const allDocuments = [];

  const formattedDatasets = results?.map((dataset) => {
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

    const formattedResources = resources?.map((resource) => {
      const {
        created: resourceCreated,
        id,
        last_modified: resourceModified,
        url,
        format,
        name: resourceName,
        description,
      } = resource;
      return {
        author,
        created: resourceCreated,
        description: description.length ? description : notes,
        format,
        id,
        name: resourceName,
        updated: resourceModified,
        url,
      };
    });

    allDocuments.push(...formattedResources);

    const allDocumentFormats = [
      ...new Set(formattedResources?.map((resource) => resource.format)),
    ];

    return {
      author,
      created,
      formats: allDocumentFormats,
      name,
      notes,
      title,
      type,
      updated,
    };
  });

  return {
    datasets: formattedDatasets,
    documents: allDocuments,
    countries: Object.keys(allCountries)
      .map((country) => country)
      .sort((a, b) => a.localeCompare(b)),
    tags: Object.keys(allTags)
      .map((tag) => tag)
      .sort((a, b) => a.localeCompare(b)),
    count,
  };
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
  let start = 0;

  const cachedStats = cache.get(statsCacheKey);
  if (cachedStats) {
    return cachedStats;
  }

  const params = {
    rows: 1000,
    start,
    fq: `organization:${organization}`,
  };

  try {
    const response = await packageSearch(params);
    const allDatasets = [];

    const {
      result: { count: datasetCount, results: datasets },
    } = response;

    allDatasets.push(...datasets);
    const promises = [];
    while (allDatasets.length < datasetCount) {
      start += start;
      params.start = start;
      promises.push(packageSearch(params));
    }
    const paginatedResponses = await Promise.all(promises);
    paginatedResponses.forEach((paginatedResponse) => {
      const {
        result: { results: paginatedDatasets },
      } = paginatedResponse;
      allDatasets.push(...paginatedDatasets);
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
