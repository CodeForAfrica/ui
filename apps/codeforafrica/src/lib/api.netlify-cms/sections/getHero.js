import { join } from "path";

import { marked } from "marked";

import { getCollectionBySlug } from "../utils";

const indexPageDir = join(process.cwd(), "content/pages");

export default function getHero(page = "index", fields = ["hero"]) {
  const { hero } = getCollectionBySlug(indexPageDir, page, fields).items;
  hero.title = marked.parseInline(hero.title);

  return hero;
}
