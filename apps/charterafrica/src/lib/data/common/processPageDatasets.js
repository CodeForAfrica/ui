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

  const datasetsIndex = blocks.findIndex(({ slug }) => slug === "datasets");

  if (datasetsIndex > -1 && organizationId) {
    const data = await fetchDatasets(organizationId);
    const { count, datasets, countries, tags, totalPages } = data;

    blocks[datasetsIndex] = {
      ...blocks[datasetsIndex],
      count,
      countries,
      data: datasets,
      tags,
      totalPages,
    };

    const swrKey = `/api/v1/resources/datasets`;
    const qs = datasetsQuery(getDatasetsQuery(context));
    // eslint-disable-next-line no-param-reassign
    page.fallback = {
      [`${swrKey}${qs}`]: [],
    };
  }

  return page;
}
