import fetchJson from "@/charterafrica/utils/fetchJson";

const BASE_DOCUMENTS_URL = "https://openafrica.net/api/3/action/";

export async function formatDatasets(data) {
  const {
    result: { results, count },
  } = data || {};

  const formattedDatasets = results?.map((dataset) => {
    const { name, notes, title, resources } = dataset;

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
    count,
  };
}
export async function fetchDatasets(q, filters = {}) {
  const params = {
    q,
    ...filters,
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
