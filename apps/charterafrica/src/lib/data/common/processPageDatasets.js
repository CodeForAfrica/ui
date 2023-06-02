import fetchDatasets, { fetchDataset } from "@/charterafrica/lib/openAfrica";
import { fetchDocuments } from "@/charterafrica/lib/sourceAfrica";
import getDocumentsQuery from "@/charterafrica/payload/utils/documents";
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
  const { blocks, breadcrumbs } = page;
  const pageUrl = breadcrumbs[breadcrumbs.length - 1]?.url;
  const dataset = await fetchDataset(datasetId, pageUrl);
  if (!dataset) {
    return null;
  }

  const { commonLabels = {} } = blocks.find(
    ({ slug }) => slug === "datasetsAndDocuments"
  );

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
  const { params } = context;
  if (params.slugs.length > 2) {
    return processSingleDataset(page, api, context);
  }
  const { blocks, breadcrumbs = [] } = page;
  const pageUrl = breadcrumbs[breadcrumbs.length - 1]?.url;

  const { organizationId } = await api.findGlobal("openAfrica");

  const datasetsIndex = blocks.findIndex(
    ({ slug }) => slug === "datasetsAndDocuments"
  );

  if (datasetsIndex > -1 && organizationId) {
    const data = await fetchDatasets(organizationId, pageUrl, {});
    const { count, datasets, countries, tags, totalPages } = data;
    const {
      documents: { showDocuments },
      datasets: datasetsOptions,
    } = blocks[datasetsIndex];

    if (showDocuments) {
      const { documents: datasetsDocuments } = blocks[datasetsIndex];
      const {
        labels,
        sortOptions,
        documents: { groupID, options },
      } = datasetsDocuments;
      const documentsData = await fetchDocuments(
        `group:${groupID}`,
        getDocumentsQuery(context, options)
      );
      blocks[datasetsIndex] = {
        ...blocks[datasetsIndex],
        documentsOptions: {
          labels,
          sortOptions,
        },
        documents: documentsData,
      };
    }
    blocks[datasetsIndex] = {
      ...blocks[datasetsIndex],
      count,
      countries,
      data: datasets,
      datasetsOptions,
      tags,
      totalPages,
      includeDocuments: showDocuments,
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
