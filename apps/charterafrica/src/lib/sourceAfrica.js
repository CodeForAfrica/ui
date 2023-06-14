import fetchJson from "@/charterafrica/utils/fetchJson";

const BASE_DOCUMENTS_URL = "https://dc.sourceafrica.net/api/";

export function formatDocuments(data, options, pathname) {
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
      title,
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
      href: `${pathname}/document?${documentURL.toString()}`,
    };
  });

  return {
    ...rest,
    documents: formattedDocuments,
  };
}

export async function fetchDocuments(q, pathname, options = {}) {
  const params = {
    ...options,
    q,
  };

  try {
    const response = await fetchJson.get(`${BASE_DOCUMENTS_URL}search.json`, {
      params,
    });
    const formattedData = formatDocuments(response, options, pathname);
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
