import { join } from "path";
import marked from "@/codeforafrica/lib/marked";

import { getCollectionBySlug } from "../utils";

const indexPageDir = join(process.cwd(), "content/pages");

export default function getHero(page, fields = ["hero"]) {
  const { hero } = getCollectionBySlug(indexPageDir, page, fields).items;
  hero.title = marked.parseInline(hero.title);

  return hero;
}
