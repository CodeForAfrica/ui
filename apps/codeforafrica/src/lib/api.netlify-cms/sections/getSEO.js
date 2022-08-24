import { join } from "path";

import { getCollectionBySlug } from "../utils";

const indexPageDir = join(process.cwd(), "content/pages");

export default function getSEO(page, fields = ["seo"]) {
  const { seo } = getCollectionBySlug(indexPageDir, page, fields).items;

  return seo;
}
