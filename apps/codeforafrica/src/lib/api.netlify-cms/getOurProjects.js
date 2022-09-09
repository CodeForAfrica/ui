import { getCollectionBySlug } from "./utils";

const FIELD_NAME = "projects";

export default function geOurProjects(page = "index") {
  const { slug } = getCollectionBySlug("content/pages", page, [
    FIELD_NAME,
    "slug",
  ]).items[FIELD_NAME];

  return { slug };
}
