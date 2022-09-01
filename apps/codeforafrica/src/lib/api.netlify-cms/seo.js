import { deepmerge } from "@mui/utils";
import camelcaseKeys from "camelcase-keys";

import getSettings from "./sections/getSettings";
import { getCollectionBySlug } from "./utils";

function createSeo(pageSeo) {
  const { seo: siteSeo, site } = getSettings("general");
  const { title, description } = site;

  const newSeo = { title, description, ...pageSeo };
  const seo = deepmerge(siteSeo, newSeo, { clone: true });
  return camelcaseKeys(seo);
}

export default function getSeo(page, pageSeo) {
  const { seo } = getCollectionBySlug("content/pages", page, ["seo"]).items;

  const newSeo = deepmerge(seo, pageSeo, { clone: true });
  return createSeo(newSeo);
}
