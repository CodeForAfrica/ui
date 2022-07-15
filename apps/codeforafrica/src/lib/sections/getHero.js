import { join } from "path";

import { getCollectionBySlug } from "../utils";

const indexPageDir = join(process.cwd(), "content/pages");

export default function getHero(page = "index", fields = ["hero"]) {
  const { hero } = getCollectionBySlug(indexPageDir, page, fields).items;
  return hero;
}
