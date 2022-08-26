import { join } from "path";

import getSettings from "./sections/getSettings";
import { getCollectionBySlug } from "./utils";

const indexPageDir = join(process.cwd(), "content/pages");

export default function getSeo(page, fields = ["seo"]) {
  let seo;
  const pageData = getCollectionBySlug(indexPageDir, page, fields).items;
  seo = pageData?.seo;

  if (!seo) {
    const generalSeo = getSettings("general");
    seo = generalSeo?.seo;
  }

  return seo;
}
