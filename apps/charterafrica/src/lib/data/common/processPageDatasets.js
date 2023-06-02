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
  const dataset = await fetchDataset(datasetId, pageUrl, locale);
  if (!dataset) {
    return null;
  }

  const { commonLabels = {} } = blocks.find(({ slug }) => slug === "datasets");

  return {
    ...page,
    slug: "dataset",
    blocks: [
      {
        ...dataset,
        commonLabels,
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

  const { organizationId } = await api.findGlobal("openAfrica");

  const datasetsIndex = blocks.findIndex(({ slug }) => slug === "datasets");

  if (datasetsIndex > -1 && organizationId) {
    const data = await fetchDatasets(organizationId, pageUrl, locale, {});
    const { count, datasets, countries, tags, totalPages } = data;

    blocks[datasetsIndex] = {
      ...blocks[datasetsIndex],
      count,
      countries,
      data: datasets,
      tags,
      totalPages,
      documents: {
        totalDocuments: 30,
        perPage: 10,
        currentPage: 1,
        totalPages: 3,
        documents: Array.from({ length: 10 }, (_, i) => ({
          id: i,
          contributor: `Contributor ${i}`,
          createdAt: "2021-09-01",
          description: `Document Description ${i}`,
          image: "/images/hero-slide-1.jpg",
          pages: 10,
          title: `Document Title ${i}`,
          url: "https://dc.sourceafrica.net/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html",
        })),
        options: {
          url: "https://dc.sourceafrica.net/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html",
          showNotes: true,
          showSearch: true,
          showText: true,
          showZoom: true,
        },
      },
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
