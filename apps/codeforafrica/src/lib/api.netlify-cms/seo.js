import { deepmerge } from "@mui/utils";
import camelcaseKeys from "camelcase-keys";

import getSettings from "./sections/getSettings";
import { getCollectionBySlug } from "./utils";

export function setSeo(seoUpdate) {
  const newSeo = seoUpdate;
  const { seo, site } = getSettings("general");
  const { title, description } = site;

  if (!newSeo.title || !newSeo.description) {
    newSeo.title = title;
    newSeo.description = description;
  }

  const seoData = deepmerge(seo, newSeo, { clone: true });
  return camelcaseKeys(seoData);
}

export function getSeo(page) {
  const { seo } = getCollectionBySlug("content/pages", page, ["seo"]).items;

  return setSeo(seo);
}
