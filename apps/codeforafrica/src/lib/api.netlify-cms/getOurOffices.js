import { getCollectionBySlug } from "./utils";

const FIELD_NAME = "our-offices";

export default function getOurOffices(page = "contact") {
  return getCollectionBySlug("content/pages", page, [FIELD_NAME, "slug"]).items[
    FIELD_NAME
  ];
}
