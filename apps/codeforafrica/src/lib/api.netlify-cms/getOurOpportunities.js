import { getCollectionBySlug } from "./utils";

const FIELD_NAME = "opportunities";

export default function getOurOpportunities(page = "opportunities") {
  const { slug } = getCollectionBySlug("content/pages", page, [
    FIELD_NAME,
    "slug",
  ]).items[FIELD_NAME];

  return { slug };
}
