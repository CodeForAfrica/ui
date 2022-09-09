import { getCollectionBySlug } from "./utils";

function getJoinUs() {
  return getCollectionBySlug("content/pages", "contact", [
    "join-our-slack",
    "slug",
  ]).items["join-our-slack"];
}

export default getJoinUs;
