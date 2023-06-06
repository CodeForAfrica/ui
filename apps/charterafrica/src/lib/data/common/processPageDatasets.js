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
  const { params, locale } = context;
  const { slugs } = params;
  const datasetId = slugs[slugs.length - 1];
  const { blocks, breadcrumbs } = page;
  const pageUrl = breadcrumbs[breadcrumbs.length - 1]?.url;
  const dataset = await fetchDataset(datasetId, pageUrl, { locale });
  if (!dataset) {
    return null;
  }

  const {
    datasets: { labels },
    labels: commonLabels,
  } = blocks.find(({ slug }) => slug === "datasetsAndDocuments");

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

  const datasetsIndex = blocks.findIndex(
    ({ slug }) => slug === "datasetsAndDocuments"
  );

  if (datasetsIndex > -1) {
    const {
      showDatasets,
      showDocuments,
      labels: commonLabels,
    } = blocks[datasetsIndex];

    if (showDatasets) {
      const {
        datasets: { organizationId, filterBar, labels },
      } = blocks[datasetsIndex];

      const data = await fetchDatasets(organizationId, pageUrl, {
        locale,
      });

      blocks[datasetsIndex] = {
        ...blocks[datasetsIndex],
        datasets: {
          data,
          filterBar,
          labels: {
            ...commonLabels,
            ...labels,
          },
          organizationId,
        },
      };
    }

    if (showDocuments) {
      const { documents: datasetsDocuments } = blocks[datasetsIndex];
      const {
        labels,
        filterBar,
        documents: { groupID, options },
      } = datasetsDocuments;
      const data = await fetchDocuments(
        `group:${groupID}`,
        getDocumentsQuery(context, options)
      );
      blocks[datasetsIndex] = {
        ...blocks[datasetsIndex],
        documents: {
          data,
          filterBar,
          labels: {
            ...commonLabels,
            ...labels,
          },
        },
      };
    }
    blocks[datasetsIndex] = {
      ...blocks[datasetsIndex],
      showDatasets,
      showDocuments,
    };

    let swrKey = `/api/v1/resources/datasets`;
    const qs = datasetsQuery(getDatasetsQuery(context));
    if (qs) {
      swrKey = `${swrKey}?${qs}`;
    }
    const {
      datasets: { data = [] },
    } = blocks[datasetsIndex];
    // eslint-disable-next-line no-param-reassign
    page.fallback = {
      [`${swrKey}`]: data,
    };
  }

  return page;
}
