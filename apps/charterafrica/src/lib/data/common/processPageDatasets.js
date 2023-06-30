import fetchDatasets, { fetchDataset } from "@/charterafrica/lib/openAfrica";
import queryString from "@/charterafrica/utils/datasets/queryString";

function getDatasetsQuery(page, context) {
  const { query = {}, locale } = context;
  const { pageNumber = 1, q, tags = "", countries = "", sort = "" } = query;
  const { breadcrumbs = [] } = page;
  const pathname = breadcrumbs[breadcrumbs.length - 1]?.url;

  return { countries, locale, page: pageNumber, pathname, q, tags, sort };
}

async function processSingleDataset(page, api, context) {
  const { params, locale } = context;
  const { slugs } = params;
  const datasetId = slugs[slugs.length - 1];
  const { blocks, breadcrumbs } = page;
  const pageUrl = breadcrumbs[breadcrumbs.length - 1]?.url;
  const dataset = await fetchDataset(datasetId, pageUrl, { locale });
  if (!dataset) {
    return null;
  }

  const { labels } = blocks.find(({ slug }) => slug === "datasets") || {};
  const { labels: commonLabels } = await api.findGlobal("common-labels", {
    locale,
  });

  return {
    ...page,
    blocks: [
      {
        ...dataset,
        labels: {
          ...commonLabels,
          ...labels,
        },
        slug: "dataset",
        pageUrl,
      },
    ],
  };
}

export default async function processPageDatasets(page, api, context) {
  const { params, locale } = context;
  if (params.slugs.length > 2) {
    return processSingleDataset(page, api, context);
  }

  const { blocks } = page;
  const datasetsIndex = blocks.findIndex(({ slug }) => slug === "datasets");
  if (datasetsIndex > -1) {
    const { organizationId, filterBar, labels, showDocuments, documents } =
      blocks[datasetsIndex];
    const datasetsQuery = getDatasetsQuery(page, context);
    const { pathname, ...query } = datasetsQuery;
    const datasets = await fetchDatasets(organizationId, pathname, query);
    const { labels: commonLabels } = await api.findGlobal("common-labels", {
      locale,
    });
    blocks[datasetsIndex] = {
      ...blocks[datasetsIndex],
      ...datasets,
      filterBar,
      labels: {
        ...commonLabels,
        ...labels,
      },
      organizationId,
      showDocuments,
      documents,
    };

    let swrKey = `/api/v1/resources/datasets`;
    const qs = queryString(datasetsQuery);
    if (qs) {
      swrKey = `${swrKey}?${qs}`;
    }
    // eslint-disable-next-line no-param-reassign
    page.fallback = {
      [swrKey]: datasets,
    };
  }

  return page;
}
