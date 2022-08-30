import { deepmerge } from "@mui/utils";

import getSettings from "./sections/getSettings";
import { getCollectionBySlug } from "./utils";

export function setSeo(seo) {
  const generalSettings = getSettings("general");
  const defaultSeo = generalSettings?.seo;
  return deepmerge(defaultSeo, seo, { clone: true });
}

export function getSeo(page) {
  const { seo } = getCollectionBySlug("content/pages", page, ["seo"]).items;

  return setSeo(seo);
}
