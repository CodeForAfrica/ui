import { deepmerge } from "@mui/utils";

import getSettings from "./sections/getSettings";
import { getCollectionBySlug } from "./utils";

export default function getSeo(page) {
  const generalSettings = getSettings("general");
  const defaultSeo = generalSettings?.seo;

  const { seo } = getCollectionBySlug("content/pages", page, ["seo"]).items;

  return deepmerge(defaultSeo, seo, { clone: true });
}
