import { getCollectionBySlug } from "./utils";

const FIELD_NAME = "related-projects";

function getRelatedProjects(page) {
  return getCollectionBySlug("content/pages", page, [FIELD_NAME, "slug"]).items[
    FIELD_NAME
  ];
}

export default getRelatedProjects;
