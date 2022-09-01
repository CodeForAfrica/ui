import { deepmerge } from "@mui/utils";
import camelcaseKeys from "camelcase-keys";

import getSettings from "./sections/getSettings";
import { getCollectionBySlug } from "./utils";

// 1. Since getCollectionBySlug creates a new object on every call,
// we don't need to clone when deep-merging.
//
// 2. If we have meta (at site or page seo level), it's title and description
// should override that level's title and description.

function createSeo(pageSeo) {
  const {
    seo: { meta, ...siteSeo },
    site: { title, description },
  } = getSettings("general");

  const seo = deepmerge(siteSeo, { title, description, ...meta, ...pageSeo });
  return camelcaseKeys(seo);
}

export default function getSeo(page, pageSeo) {
  const {
    seo: { meta, ...seo },
  } = getCollectionBySlug("content/pages", page, ["seo"]).items;

  return createSeo(deepmerge({ ...seo, ...meta }, pageSeo));
}
