import { getCollectionBySlug } from "./utils";

export default function geOurPartners() {
  const {
    "our-team": { title },
  } = getCollectionBySlug("content/pages", "about", ["our-team"]).items;

  return { title };
}
