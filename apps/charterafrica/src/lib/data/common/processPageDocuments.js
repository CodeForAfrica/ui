import {
  fetchDocuments,
  fetchDocumentIframe,
} from "@/charterafrica/lib/sourceAfrica";
import getDocumentsQuery from "@/charterafrica/utils/documents/documents";
import documentsQueryString from "@/charterafrica/utils/documents/queryString";

async function processSingleDocument(page, api, context) {
  const { query, locale } = context;
  const { title, ...rest } = query;

  const { blocks } = page;
  const { labels } = blocks.find(({ slug }) => slug === "documents") || {};
  const { labels: commonLabels } = await api.findGlobal("common-labels", {
    locale,
  });

  const data = await fetchDocumentIframe(rest);
  const { html } = data;

  return {
    ...page,
    blocks: [
      {
        slug: "embedded-resource-document-viewer",
        html,
        title,
        labels: {
          ...commonLabels,
          ...labels,
        },
      },
    ],
  };
}

export default async function processPageDocuments(page, api, context) {
  const { locale, params } = context;
  if (params.slugs.length > 2) {
    return processSingleDocument(page, api, context);
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
    const query = getDocumentsQuery(context, options);
    const documents = await fetchDocuments(`group:${groupId}`, pageUrl, query);

    const { labels: commonLabels } = await api.findGlobal("common-labels", {
      locale,
    });
    blocks[documentsIndex] = {
      ...documents,
      documentOptions: options,
      slug: "documents",
      filterBar,
      labels: {
        ...commonLabels,
        ...labels,
      },
      showDatasets,
      showFilterBar,
      datasets,
      pathname: pageUrl,
    };

    let swrKey = `/api/v1/resources/datasets`;
    const qs = documentsQueryString(getDocumentsQuery(context));
    if (qs) {
      swrKey = `${swrKey}?${qs}`;
    }
    // eslint-disable-next-line no-param-reassign
    page.fallback = {
      [`${swrKey}`]: documents,
    };
  }

  return page;
}
