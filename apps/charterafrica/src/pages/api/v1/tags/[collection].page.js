import { getServerSideTags } from "@/charterafrica/lib/data/local";

const COLLECTIONS = ["grantees", "news", "research"];

export default async function handler(req, res) {
  const { query: { collection, locale = "en" } = {} } = req;
  if (!COLLECTIONS.includes(collection)) {
    return res.status(400).json({ message: "UNKNOWN_COLLECTION", collection });
  }

  const context = {
    locale,
  };
  const tags = await getServerSideTags(collection, context);
  return res.status(200).json({
    tags,
  });
}
