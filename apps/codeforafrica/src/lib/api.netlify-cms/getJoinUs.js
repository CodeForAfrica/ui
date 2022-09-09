import { getCollectionBySlug } from "./utils";

const FIELD_NAME = "join-our-slack";

function getJoinUs() {
  return getCollectionBySlug("content/pages", "contact", [FIELD_NAME, "slug"])
    .items[FIELD_NAME];
}

export default getJoinUs;
