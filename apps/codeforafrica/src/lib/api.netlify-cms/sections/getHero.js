import { join } from "path";

import { marked } from "marked";

import { getCollectionBySlug } from "../utils";

const indexPageDir = join(process.cwd(), "content/pages");
const FIELD_NAME = "hero";

export default function getHero(page, fields = [FIELD_NAME, "slug"]) {
  const { hero } = getCollectionBySlug(indexPageDir, page, fields).items;
  hero.title = marked.parseInline(hero.title);

  return hero;
}
