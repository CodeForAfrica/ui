import fetchJson from "@/charterafrica/utils/fetchJson";

const BASE_DOCUMENTS_URL = "https://openafrica.net/api/3/action/";

const PageSize = 10;

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
      created: resourceCreated,
      id,
      last_modified: resourceUpdated,
      url,
      format,
      name: resourceName,
      description,
    } = resource;
    return {
      author,
      created: resourceCreated,
      description,
      format,
      id,
      name: resourceName,
      updated: resourceUpdated,
      url,
    };
  });
}

function formatDatasets(datasets) {
  return datasets?.map((dataset) => {
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

    const formattedResources = formatResources(resources, author);

    const formats = [
      ...new Set(formattedResources?.map((resource) => resource.format)),
    ];

    return {
      author,
      created,
      formats,
      formattedResources,
      name,
      notes,
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

  const countries = Object.keys(groups || {}).sort((a, b) =>
    a.localeCompare(b)
  );
  const tagsList = Object.keys(tags || {}).sort((a, b) => a.localeCompare(b));

  return {
    count,
    datasets,
    countries,
    tags: tagsList,
    totalPages: Math.ceil(count / PageSize),
  };
}

export default async function fetchDatasets(organization, query = {}) {
  const { tags = [], countries = [], page = 1, ...other } = query;
  const tagsQuery = tags.length
    ? `tags:(${tags.reduce((acc, tag) => {
        return acc ? `${acc} OR "${tag}"` : `"${tag}"`;
      }, null)})`
    : null;
  const countriesQuery = countries.length
    ? `groups:(${countries.reduce((acc, country) => {
        return acc ? `${acc} OR "${country}"` : `"${country}"`;
      }, null)})`
    : null;
  const organizationQuery = `organization:${organization}`;
  const filterQuery = [organizationQuery, tagsQuery, countriesQuery]
    .filter(Boolean)
    .join(" AND ");
  const params = {
    ...other,
    fq: filterQuery,
    rows: PageSize,
    start: (page - 1) * PageSize,
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
