import fetchDatasets from "@/charterafrica/lib/openAfrica";
import datasetsQuery from "@/charterafrica/utils/datasets/queryString";

const getDatasetsQuery = (context) => {
  const { query = {}, locale } = context;
  const { page = 1, q, tags = "", countries = "", sort = "" } = query;

  return { countries, locale, page, q, tags, sort };
};

export default async function processPageDatasets(page, api, context) {
  const { blocks } = page;
  const { organizationId, statistics } = await api.findGlobal("openAfrica");

  const resourceHeaderIndex = blocks.findIndex(
    ({ slug }) => slug === "resource-page-header"
  );

  if (resourceHeaderIndex > -1) {
    const { resourceType, title } = blocks[resourceHeaderIndex];
    if (resourceType === "dataset") {
      blocks[resourceHeaderIndex] = {
        slug: "datasets-charts",
        title,
        data: [
          {
            id: "datasets",
            value: statistics.datasets,
            label: "Datasets",
            color: "#FFC107",
          },
          {
            id: "documents",
            value: statistics.documents,
            label: "Documents",
            color: "#FF9800",
          },
        ],
      };
    }
  }

  const data = await fetchDatasets(organizationId);
  const { count, datasets, countries, tags, totalPages } = data;

  const datasetsIndex = blocks.findIndex(({ slug }) => slug === "datasets");

  if (datasetsIndex > -1) {
    blocks[datasetsIndex] = {
      ...blocks[datasetsIndex],
      count,
      countries,
      data: datasets,
      tags,
      totalPages,
    };
  }
  const swrKey = `/api/v1/resources/datasets`;
  const qs = datasetsQuery(getDatasetsQuery(context));
  // eslint-disable-next-line no-param-reassign
  page.fallback = {
    [`${swrKey}${qs}`]: data,
  };

  return page;
}
