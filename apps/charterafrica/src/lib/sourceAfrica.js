import * as Sentry from "@sentry/nextjs";

import fetchJson from "@/charterafrica/utils/fetchJson";

const BASE_DOCUMENTS_URL = "https://dc.sourceafrica.net/api/";

function formatDocuments(data, pathname) {
  const { documents, ...rest } = data || {};
  const formattedDocuments = documents?.map((document) => {
    const {
      canonical_url: canonicalUrl,
      contributor,
      created_at: createdAt,
      description,
      id,
      resources,
      title,
      pages,
    } = document;
    const { image } = resources.page;
    const imageUrl = image
      .replace("-p{page}", "-p1")
      .replace("-{size}", "-normal");

    return {
      contributor,
      createdAt,
      description,
      id,
      image: imageUrl,
      pages,
      title,
      url: canonicalUrl,
      href: `${pathname}/${id}`,
    };
  });

  return {
    ...rest,
    documents: formattedDocuments || [],
  };
}

export async function fetchDocuments(
  q,
  pathname,
  options = {},
  showPinnedDocuments = false,
) {
  const params = {
    ...options,
    q,
  };
  try {
    const data = await fetchJson.get(`${BASE_DOCUMENTS_URL}search.json`, {
      params,
    });
    const formattedData = formatDocuments(data, pathname);

    if (!showPinnedDocuments) {
      return formattedData;
    }

    const pinnedDocuments = await fetchJson.get(
      `${BASE_DOCUMENTS_URL}search.json`,
      {
        params: {
          ...params,
          q: `${q} pinned:true`,
        },
      },
    );
    const formattedPinnedDocuments = formatDocuments(pinnedDocuments, pathname);

    formattedData.pinnedDocuments = formattedPinnedDocuments.documents;

    formattedData.documents = formattedData.documents.filter(
      (document) =>
        !formattedData.pinnedDocuments.find(
          (pinnedDocument) => pinnedDocument.id === document.id,
        ),
    );

    return formattedData;
  } catch (err) {
    Sentry.captureException(err);
  }
  return null;
}

export async function fetchDocument(id, pathname) {
  try {
    const { document } =
      (await fetchJson.get(`${BASE_DOCUMENTS_URL}documents/${id}.json`)) || {};
    if (document) {
      const result = formatDocuments({ documents: [document] }, pathname);
      return result?.documents?.[0] || null;
    }
  } catch (err) {
    Sentry.captureException(err);
  }
  return null;
}

export async function fetchDocumentIframe(params) {
  try {
    return fetchJson.get(`${BASE_DOCUMENTS_URL}oembed.json`, {
      params,
    });
  } catch (err) {
    Sentry.captureException(err);
  }
  return null;
}
