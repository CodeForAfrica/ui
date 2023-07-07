import { getServerSideArticles } from "@/charterafrica/lib/data/local";

const COLLECTIONS = ["news", "research"];

export default async function handler(req, res) {
  const { payload, query: { collection, locale = "en", ...query } = {} } = req;
  if (!COLLECTIONS.includes(collection)) {
    return res.status(400).json({ message: "UNKNOWN_COLLECTION", collection });
  }

  const result = await payload.find({
    locale,
    collection: "pages",
    where: {
      slug: {
        equals: collection,
      },
    },
  });
  if (!result.docs.length) {
    return res
      .status(500)
      .json({ message: "COLLECTION_PAGE_NOT_SET", collection });
  }

  const [page] = result.docs;
  const context = {
    locale,
    query,
  };
  const found = await getServerSideArticles(page, context);
  return res.status(200).json(found);
}
