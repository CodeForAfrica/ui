import fetchJson from "@/charterafrica/utils/fetchJson";

const BASE_DOCUMENTS_URL = "https://openafrica.net/api/3/action/";

const PAGE_SIZE = 10;

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

function formatResources(resources, author) {
  return resources?.map((resource) => {
    const {
      created,
      id,
      last_modified: updated,
      url,
      format,
      name,
      description,
    } = resource;
    return {
      author,
      created,
      description,
      format,
      id,
      name,
      updated,
      url,
    };
  });
}

function formatDatasets(datasets) {
  return datasets?.map((dataset) => {
    const {
      author,
      id,
      metadata_created: created,
      metadata_modified: updated,
      name,
      notes,
      resources,
      title,
      type,
      url,
    } = dataset;

    const formattedResources = formatResources(resources, author);

    const formatsSet = new Set(resources?.map((r) => r.format));
    const formats = Array.from(formatsSet);

    return {
      author,
      created,
      formats,
      formattedResources,
      id,
      name,
      notes,
      url,
      title,
      type,
      updated,
    };
  });
}

function formatResponse(data) {
  const { result: { count, facets: { tags, groups }, results } = {} } =
    data || {};

  const datasets = formatDatasets(results);
  const sortStrings = (a, b) => a.localeCompare(b);
  const countries = Object.keys(groups || {}).sort(sortStrings);
  const tagsList = Object.keys(tags || {}).sort(sortStrings);

  return {
    count,
    datasets,
    countries,
    tags: tagsList,
    totalPages: Math.ceil(count / PAGE_SIZE),
  };
}

export default async function fetchDatasets(organization, query = {}) {
  const { tags = [], countries = [], page = 1, ...other } = query;
  const tagsQuery = tags.length
    ? `tags:(${tags.map((t) => `"${t}"`).join(" OR ")})`
    : null;
  const countriesQuery = countries.length
    ? `groups:(${countries.map((c) => `"${c}"`).join(" OR ")})`
    : null;
  const organizationQuery = `organization:${organization}`;
  const filterQuery = [organizationQuery, tagsQuery, countriesQuery]
    .filter(Boolean)
    .join(" AND ");
  const params = {
    ...other,
    fq: filterQuery,
    rows: PAGE_SIZE,
    start: (page - 1) * PAGE_SIZE,
    "facet.field": '["tags", "groups"]',
  };

  try {
    const response = await packageSearch(params);
    const formattedData = formatResponse(response);
    return formattedData;
  } catch (error) {
    return error;
  }
}
