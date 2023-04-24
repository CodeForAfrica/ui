import { getOrganizationId } from "@/charterafrica/lib/data/rest";
import fetchJson from "@/charterafrica/utils/fetchJson";

const BASE_DOCUMENTS_URL = "https://openafrica.net/api/3/action/";

async function formatDatasets(data) {
  const {
    result: {
      count,
      facets: { tags: allTags },
      results,
    },
  } = data || {};

  const formattedDatasets = results?.map((dataset) => {
    const { name, notes, resources, title } = dataset;

    const formattedResources = resources?.map((resource) => {
      const { url, format, name: resourceName, description } = resource;
      return {
        url,
        format,
        name: resourceName,
        description,
      };
    });

    const allDocumentFormats = [
      ...new Set(formattedResources?.map((resource) => resource.format)),
    ];

    return {
      name,
      notes,
      title,
      documents: formattedResources,
      formats: allDocumentFormats,
    };
  });

  return {
    datasets: formattedDatasets,
    tags: Object.keys(allTags).map((tag) => tag),
    count,
  };
}
export default async function fetchDatasets(query = {}) {
  const { tags = [] } = query;
  const tagsQuery = tags.length ? `tags:(${tags.join(" OR ")})` : "";
  const orgId = await getOrganizationId();
  const organizationQuery = `organization:${orgId}`;
  const filterQuery = [tagsQuery, organizationQuery]
    .filter(Boolean)
    .join(" AND ");

  const params = {
    ...query,
    fq: filterQuery,
    "facet.field": '["tags"]',
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
