import { join } from "path";

import { getCollectionBySlug } from "../utils";

import marked from "@/codeforafrica/lib/marked";

const indexPageDir = join(process.cwd(), "content/pages");

export default function getHero(page, fields = ["hero"]) {
  const { hero } = getCollectionBySlug(indexPageDir, page, fields).items;
  hero.title = marked.parseInline(hero.title);

  return hero;
}
