import { fetchDocuments } from "@/charterafrica/lib/sourceAfrica";
import { fetchResource } from "@/charterafrica/lib/youtube";

const documents = async (req, res) => {
  const { q, media, ...rest } = req.query;

  try {
    const data = await fetchDocuments(q, rest);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const multimedia = async (req, res) => {
  try {
    const { pathname, ...rest } = req.query;
    const data = await fetchResource(pathname, rest);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
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
