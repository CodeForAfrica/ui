import fetchJson from "@/charterafrica/utils/fetchJson";

const BASE_DOCUMENTS_URL = "https://dc.sourceafrica.net/api/";

export function formatDocuments(data, options) {
  const { documents, ...rest } = data || {};
  const formattedDocuments = documents?.map((document) => {
    const {
      canonical_url: canonicalUrl,
      contributor,
      created_at: createdAt,
      description,
      resources,
      title,
      pages,
    } = document;
    const { image } = resources.page;

    const imageUrl = image
      .replace("-p{page}", "-p1")
      .replace("-{size}", "-normal");

    const documentURL = new URLSearchParams({
      url: canonicalUrl,
      ...options,
    });

    return {
      contributor,
      createdAt,
      description,
      image: imageUrl,
      pages,
      title,
      url: documentURL.toString(),
      options,
    };
  });

  return {
    ...rest,
    documents: formattedDocuments,
  };
}

export async function fetchDocuments(q, options = {}) {
  const params = {
    q,
    contributor: true,
    per_page: 8,
    ...options,
  };

  try {
    const response = await fetchJson.get(`${BASE_DOCUMENTS_URL}search.json`, {
      params,
    });
    const formattedData = formatDocuments(response, options);
    return formattedData;
  } catch (error) {
    return error;
  }
}

export async function fetchDocumentIframe(params) {
  try {
    const response = await fetchJson.get(`${BASE_DOCUMENTS_URL}oembed.json`, {
      params,
    });
    return response;
  } catch (error) {
    return error;
  }
}
