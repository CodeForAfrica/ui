import { join } from "path";

import { getCollectionBySlug } from "../utils";

import marked from "@/codeforafrica/lib/marked";

const indexPageDir = join(process.cwd(), "content/pages");
const FIELD_NAME = "hero";

export default function getHero(page, fields = [FIELD_NAME, "slug"]) {
  const { hero } = getCollectionBySlug(indexPageDir, page, fields).items;
  hero.title = marked.parseInline(hero.title);

  return hero;
}
