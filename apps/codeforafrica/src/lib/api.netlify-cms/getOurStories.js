import { getCollectionBySlug } from "./utils";

const FIELD_NAME = "stories";

export default function getOurStories(page = "stories") {
  return getCollectionBySlug("content/pages", page, [FIELD_NAME, "slug"]).items[
    FIELD_NAME
  ];
}
