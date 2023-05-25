import fetchDatasets, { fetchDataset } from "@/charterafrica/lib/openAfrica";
import datasetsQuery from "@/charterafrica/utils/datasets/queryString";

const getDatasetsQuery = (context) => {
  const { query = {}, locale } = context;
  const { page = 1, q, tags = "", countries = "", sort = "" } = query;

  return { countries, locale, page, q, tags, sort };
};

async function processSingleDataset(page, api, context) {
  const { params } = context;
  const { slugs } = params;
  const datasetId = slugs[slugs.length - 1];
  const dataset = await fetchDataset(datasetId);
  if (!dataset) {
    return null;
  }
  const { blocks, breadcrumbs } = page;
  const pageUrl = breadcrumbs[breadcrumbs.length - 1]?.url;
  const { commonLabels = {} } = blocks.find(({ slug }) => slug === "datasets");

  return {
    ...page,
    slug: "dataset",
    blocks: [
      {
        ...dataset,
        commonLabels,
        slug: "dataset",
        pageUrl,
      },
    ],
  };
}

export default async function processPageDatasets(page, api, context) {
  const { params } = context;
  if (params.slugs.length > 2) {
    return processSingleDataset(page, api, context);
  }
  const { blocks, breadcrumbs = [] } = page;
  const pageUrl = breadcrumbs[breadcrumbs.length - 1]?.url;

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
      pageUrl,
    };

    let swrKey = `/api/v1/resources/datasets`;
    const qs = datasetsQuery(getDatasetsQuery(context));
    if (qs) {
      swrKey = `${swrKey}?${qs}`;
    }
    // eslint-disable-next-line no-param-reassign
    page.fallback = {
      [`${swrKey}`]: data,
    };
  }

  return page;
}
