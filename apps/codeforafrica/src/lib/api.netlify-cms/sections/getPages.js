import { join } from "path";

import { getCollectionBySlug } from "../utils";

const pagesPageDir = join(process.cwd(), "content/pages");

export default function getPages(section) {
  return getCollectionBySlug(pagesPageDir, section).data;
}
