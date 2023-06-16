import { fetchDocuments } from "@/charterafrica/lib/sourceAfrica";
import getDocumentsQuery from "@/charterafrica/utils/documents/documents";
import documentsQueryString from "@/charterafrica/utils/documents/queryString";

export default async function processPageDocuments(page, api, context) {
  const { locale } = context;

  const { blocks } = page;

  const documentsIndex = blocks.findIndex(({ slug }) => slug === "documents");
  if (documentsIndex > -1) {
    const {
      organization: { groupId, options },
      filterBar,
      labels,
      showDatasets,
      datasets: { href: datasetsHref },
    } = blocks[documentsIndex];
    const query = getDocumentsQuery(context, options);
    const documents = await fetchDocuments(`group:${groupId}`, query);

    const { labels: commonLabels } = await api.findGlobal("common-labels", {
      locale,
    });
    blocks[documentsIndex] = {
      ...documents,
      slug: "documents",
      filterBar,
      labels: {
        ...commonLabels,
        ...labels,
      },
      showDatasets,
      datasetsHref,
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
