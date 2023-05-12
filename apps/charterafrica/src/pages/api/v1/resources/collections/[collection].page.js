import {
  getServerSideOrgs,
  getServerSidePeople,
  getServerSideTools,
} from "@/charterafrica/lib/data/local";

const collectionMap = {
  organisations: getServerSideOrgs,
  people: getServerSidePeople,
  tools: getServerSideTools,
};

export default async function handler(req, res) {
  const { query: { collection, locale = "en", ...query } = {} } = req;
  if (!Object.keys(collectionMap).includes(collection)) {
    return res.status(400).json({ message: "UNKNOWN_COLLECTION", collection });
  }
  const breadcrumbs = [
    {
      url: `/resources/${collection}`,
    },
  ];
  const page = {
    slug: collection,
    breadcrumbs,
  };
  const context = {
    locale,
    query,
  };
  const found = await collectionMap[collection](page, context);
  return res.status(200).json(found);
}
