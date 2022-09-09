import { getCollectionBySlug } from "./utils";

const FIELD_NAME = "team";

export default function getProjectTeam(page = "our-work-individual") {
  return getCollectionBySlug("content/pages", page, [FIELD_NAME, "slug"]).items[
    FIELD_NAME
  ];
}
