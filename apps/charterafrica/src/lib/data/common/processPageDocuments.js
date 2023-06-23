import {
  fetchDocument,
  fetchDocuments,
  fetchDocumentIframe,
} from "@/charterafrica/lib/sourceAfrica";
import getDocumentsQuery from "@/charterafrica/utils/documents/documents";
import queryString from "@/charterafrica/utils/documents/queryString";

async function processPageDocument(page, api, context) {
  const { params } = context;
  const { blocks } = page;
  const documentsIndex = blocks.findIndex(({ slug }) => slug === "documents");
  if (documentsIndex === -1) {
    return null;
  }

  const {
    organization: { options },
    labels,
  } = blocks[documentsIndex];
  const documentsQuery = getDocumentsQuery(page, context, options);
  const { pathname, ...query } = documentsQuery;
  const id = params.slugs[2];
  const document = await fetchDocument(id, pathname);
  if (!document) {
    return null;
  }

  const { labels: commonLabels } = await api.findGlobal("common-labels", query);
  const { url } = document;
  const data = await fetchDocumentIframe({ ...query, responsive: true, url });
  const { html } = data;
  return {
    ...page,
    blocks: [
      {
        ...document,
        html,
        labels: {
          ...commonLabels,
          ...labels,
        },
        slug: "document",
      },
    ],
  };
}

export default async function processPageDocuments(page, api, context) {
  const { locale, params } = context;
  if (params.slugs.length > 2) {
    return processPageDocument(page, api, context);
  }

  const { blocks, breadcrumbs } = page;
  const pageUrl = breadcrumbs[breadcrumbs.length - 1]?.url;

  const documentsIndex = blocks.findIndex(({ slug }) => slug === "documents");
  if (documentsIndex > -1) {
    const {
      datasets,
      filterBar,
      labels,
      organization: { groupId, options },
      showDatasets,
      showFilterBar,
    } = blocks[documentsIndex];
    const documentsQuery = getDocumentsQuery(page, context, options);
    const { pathname, ...query } = documentsQuery;
    const documents = await fetchDocuments(`group:${groupId}`, pathname, query);

    const { labels: commonLabels } = await api.findGlobal("common-labels", {
      locale,
    });
    blocks[documentsIndex] = {
      ...blocks[documentsIndex],
      ...documents,
      documentOptions: options,
      showFilterBar,
      filterBar,
      labels: {
        ...commonLabels,
        ...labels,
      },
      showDatasets,
      datasets,
      pathname: pageUrl,
    };

    let swrKey = `/api/v1/resources/documents`;
    const qs = queryString(documentsQuery);
    if (qs) {
      swrKey = `${swrKey}?${qs}`;
    }
    // eslint-disable-next-line no-param-reassign
    page.fallback = {
      [swrKey]: documents,
    };
  }

  return page;
}
