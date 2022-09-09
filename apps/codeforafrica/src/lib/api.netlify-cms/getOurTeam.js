import { getCollectionBySlug } from "./utils";

export default function geOurPartners() {
  const {
    "our-team": { title, slug },
  } = getCollectionBySlug("content/pages", "about", ["our-team", "slug"]).items;

  return { title, slug };
}
