import { join } from "path";

import getSettings from "./sections/getSettings";
import { getCollectionBySlug } from "./utils";

const indexPageDir = join(process.cwd(), "content/pages");

export default function getSeo(page, fields = ["seo"]) {
  const generalSettings = getSettings("general");
  const defaultSeo = generalSettings?.seo;

  const { seo } = getCollectionBySlug(indexPageDir, page, fields).items;

  return seo ? Object.assign(seo, defaultSeo) : defaultSeo;
}
