import { join } from "path";

import getSettings from "./sections/getSettings";
import { getCollectionBySlug } from "./utils";

const indexPageDir = join(process.cwd(), "content/pages");

export default function getSeo(page, fields = ["seo"]) {
  if (page === "default") {
    const { seo } = getSettings("general");
    return seo;
  }

  const { seo } = getCollectionBySlug(indexPageDir, page, fields).items;

  return seo;
}
