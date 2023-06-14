import fetchDatasets, { fetchDataset } from "@/charterafrica/lib/openAfrica";
import datasetsQuery from "@/charterafrica/utils/datasets/queryString";

const getDatasetsQuery = (context) => {
  const { query = {}, locale } = context;
  const { page = 1, q, tags = "", countries = "", sort = "" } = query;

  return { countries, locale, page, q, tags, sort };
};

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

  const { labels } = blocks.find(({ slug }) => slug === "datasets");

  const { labels: commonLabels } = await api.findGlobal("common-labels", {
    locale,
  });

  return {
    ...page,
    slug: "dataset",
    blocks: [
      {
        ...dataset,
        labels: {
          ...commonLabels,
          ...labels,
        },
        slug: "dataset",
      },
    ],
  };
}

export default async function processPageDatasets(page, api, context) {
  const { params, locale } = context;
  if (params.slugs.length > 2) {
    return processSingleDataset(page, api, context);
  }
  const { blocks, breadcrumbs = [] } = page;
  const pageUrl = breadcrumbs[breadcrumbs.length - 1]?.url;

  const datasetsIndex = blocks.findIndex(({ slug }) => slug === "datasets");

  if (datasetsIndex > -1) {
    const {
      organizationId,
      filterBar,
      labels,
      showDocuments,
      documents: { href: documentsHref },
    } = blocks[datasetsIndex];
    const datasets = await fetchDatasets(organizationId, pageUrl, {
      locale,
    });
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
      documentsHref,
    };

    let swrKey = `/api/v1/resources/datasets`;
    const qs = datasetsQuery(getDatasetsQuery(context));
    if (qs) {
      swrKey = `${swrKey}?${qs}`;
    }
    // eslint-disable-next-line no-param-reassign
    page.fallback = {
      [`${swrKey}`]: datasets,
    };
  }

  return page;
}
