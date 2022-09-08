import { join } from "path";

import getGuidingPrinciples from "./getGuidingPrinciples";
import { getCollectionBySlug } from "./utils";

const pagesDir = join(process.cwd(), "content/pages");

function getOurGuidingPrinciples() {
  const {
    title,
    "guiding-principle-list": principleIds,
    slug,
  } = getCollectionBySlug(pagesDir, "about", ["guiding-principles", "slug"])
    .items["guiding-principles"];
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
