import { getCollectionBySlug } from "./utils";

const FIELD_NAME = "get-in-touch";

export default function getGetInTouch() {
  return getCollectionBySlug("content/pages", "about", [FIELD_NAME, "slug"])
    .items[FIELD_NAME];
}
