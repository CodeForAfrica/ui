import { join } from "path";

import { getCollectionSlugs, getCollectionBySlug } from "./utils";

const partnersDir = join(process.cwd(), "content/partners");

export default function getPartners() {
  const slugs = getCollectionSlugs(partnersDir);
  const partners = [];
  slugs.forEach((slug) => {
    const badge = getCollectionBySlug(partnersDir, slug);
    partners.push(badge.data);
  });
  return partners;
}
