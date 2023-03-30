import { fetchResource } from "@/charterafrica/lib/youtube";

const BASE_DOCUMENTS_URL = "https://dc.sourceafrica.net/api/";

function formatDocuments(data) {
  const { documents: originalDocs, ...rest } = data || {};
  const documents = originalDocs?.map((document) => {
    const { resources, ...other } = document;
    const { image } = resources.page;

    const imageUrl = image
      .replace("-p{page}", "-p1")
      .replace("-{size}", "-normal");
    return {
      ...other,
      image: imageUrl,
    };
  });

  return {
    ...rest,
    documents,
  };
}

const documents = async (req, res) => {
  const { type, ...rest } = req.query;
  const params = new URLSearchParams(rest).toString();
  const fullURL =
    type === "search"
      ? `${BASE_DOCUMENTS_URL}search.json?${params}`
      : `${BASE_DOCUMENTS_URL}oembed.json?${params}`;

  try {
    const response = await fetch(fullURL);
    const data = await response.json();
    const formattedData = type === "search" ? formatDocuments(data) : data;
    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const multimedia = async (req, res) => {
  try {
    const { pathname, ...rest } = req.query;
    const data = await fetchResource(pathname, rest);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const mediaMap = {
  documents,
  multimedia,
};

export default async function handler(req, res) {
  const {
    query: { media },
  } = req;
  const response = mediaMap[media];
  if (response) {
    return response(req, res);
  }
  return res.status(404).json({ message: "UNKNOWN_MEDIA", media });
}
