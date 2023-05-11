import fetchDatasets from "@/charterafrica/lib/openAfrica";
import datasetsQuery from "@/charterafrica/utils/datasets/queryString";

const getDatasetsQuery = (context) => {
  const { query = {}, locale } = context;
  const { page = 1, q, tags = "", countries = "", sort = "" } = query;

  return { countries, locale, page, q, tags, sort };
};

export default async function processPageDatasets(page, api, context) {
  const { blocks } = page;
  const { organizationId } = await api.findGlobal("openAfrica");
  const data = await fetchDatasets(organizationId);
  const { count, datasets, countries, tags, totalPages } = data;

  const datasetsIndex = blocks.findIndex(({ slug }) => slug === "datasets");
  const resourceHeaderIndex = blocks.findIndex(
    ({ slug }) => slug === "resource-header"
  );
  if (datasetsIndex > -1) {
    const { statistics } = blocks[datasetsIndex];
    blocks[datasetsIndex] = {
      ...blocks[datasetsIndex],
      count,
      countries,
      data: datasets,
      tags,
      totalPages,
    };

    if (resourceHeaderIndex > -1) {
      const { resourceType, title } = blocks[resourceHeaderIndex];
      if (resourceType === "dataset") {
        blocks[resourceHeaderIndex] = {
          slug: "datasets-charts",
          title,
          data: Object.keys(statistics).map((key) => {
            return {
              ...statistics[key],
              id: key,
              value: statistics[key].count,
            };
          }),
        };
      }
    }
  }
  const swrKey = `/api/v1/resources/datasets`;
  const qs = datasetsQuery(getDatasetsQuery(context));
  // eslint-disable-next-line no-param-reassign
  page.fallback = {
    [`${swrKey}${qs}`]: data,
  };

  return page;
}
