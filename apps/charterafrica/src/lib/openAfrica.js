import fetchJson from "@/charterafrica/utils/fetchJson";

const BASE_DOCUMENTS_URL = "https://openafrica.net/api/3/action/";

async function formatDatasets(data) {
  const {
    result: {
      count,
      facets: { tags: allTags, groups: allCountries },
      results,
    },
  } = data || {};

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
      const { url, format, name: resourceName, description } = resource;
      return {
        description,
        format,
        name: resourceName,
        url,
      };
    });

    const allDocumentFormats = [
      ...new Set(formattedResources?.map((resource) => resource.format)),
    ];

    return {
      author,
      created,
      documents: formattedResources,
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
    const response = await fetchJson.get(
      `${BASE_DOCUMENTS_URL}package_search`,
      {
        params,
      }
    );
    const formattedData = formatDatasets(response);
    return formattedData;
  } catch (error) {
    return error;
  }
}
