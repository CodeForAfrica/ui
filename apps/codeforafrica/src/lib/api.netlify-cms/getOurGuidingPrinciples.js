import { join } from "path";

import getGuidingPrinciples from "./getGuidingPrinciples";
import { getCollectionBySlug } from "./utils";

const pagesDir = join(process.cwd(), "content/pages");

function getOurGuidingPrinciples() {
  const list = getCollectionBySlug(pagesDir, "about", ["guiding-principles"])
    .items["guiding-principles"];
  const allPrinciples = getGuidingPrinciples([
    "id",
    "title",
    "icon",
    "content",
  ]);

  return list?.map((id) => allPrinciples.find((p) => p.id === id)) ?? null;
}

export default getOurGuidingPrinciples;
