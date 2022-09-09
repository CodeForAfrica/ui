import { join } from "path";

import getGuidingPrinciples from "./getGuidingPrinciples";
import { getCollectionBySlug } from "./utils";

const pagesDir = join(process.cwd(), "content/pages");

const FIELD_NAME = "guiding-principles";

function getOurGuidingPrinciples() {
  const {
    title,
    "guiding-principle-list": principleIds,
    slug,
  } = getCollectionBySlug(pagesDir, "about", [FIELD_NAME, "slug"]).items[
    FIELD_NAME
  ];
  const allPrinciples = getGuidingPrinciples([
    "id",
    "title",
    "icon",
    "content",
  ]);

  const list =
    principleIds?.map((id) => allPrinciples.find((p) => p.id === id)) ?? null;
  return { title, list, slug };
}

export default getOurGuidingPrinciples;
