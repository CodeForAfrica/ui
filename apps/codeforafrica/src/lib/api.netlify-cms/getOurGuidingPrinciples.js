import { join } from "path";

import getGuidingPrinciples from "./getGuidingPrinciples";
import { getCollectionBySlug } from "./utils";

const pagesDir = join(process.cwd(), "content/pages");

function getOurGuidingPrinciples() {
  const { title, "guiding-principle-list": principleIds } = getCollectionBySlug(
    pagesDir,
    "about",
    ["guiding-principles"]
  ).items["guiding-principles"];
  const allPrinciples = getGuidingPrinciples([
    "id",
    "title",
    "icon",
    "content",
  ]);

  const list =
    principleIds?.map((id) => allPrinciples.find((p) => p.id === id)) ?? null;
  return { title, list };
}

export default getOurGuidingPrinciples;
