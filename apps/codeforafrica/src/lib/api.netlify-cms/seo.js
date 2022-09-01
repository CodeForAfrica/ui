import { deepmerge } from "@mui/utils";
import camelcaseKeys from "camelcase-keys";

import getSettings from "./sections/getSettings";
import { getCollectionBySlug } from "./utils";

// Since getCollectionBySlug creates a new object on every call,
// we don't need to to clone when deep-merging.

function createSeo(pageSeo) {
  const {
    seo: siteSeo,
    site: { title, description },
  } = getSettings("general");

  const seo = deepmerge(siteSeo, { title, description, ...pageSeo });
  return camelcaseKeys(seo);
}

export default function getSeo(page, pageSeo) {
  const { seo } = getCollectionBySlug("content/pages", page, ["seo"]).items;

  return createSeo(deepmerge(seo, pageSeo));
}
