import { getCollectionBySlug } from "./utils";

const FIELD_NAME = "our-project";
export default function geOurProjects() {
  const { slug } = getCollectionBySlug("content/pages", "index", [
    FIELD_NAME,
    "slug",
  ]).items[FIELD_NAME];

  return { slug };
}
