import { join } from "path";

import { marked } from "marked";

import { getCollectionBySlug } from "../utils";

import DOMPurify from "@/codeforafrica/utils/dompurifyMarked";

const indexPageDir = join(process.cwd(), "content/pages");

export default function getHero(page, fields = ["hero"]) {
  const { hero } = getCollectionBySlug(indexPageDir, page, fields).items;
  hero.title = DOMPurify.sanitize(marked.parseInline(hero.title));

  return hero;
}
