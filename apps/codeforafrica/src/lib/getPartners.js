import { join } from "path";

import { getCollectionSlugs, getCollectionBySlug } from "./utils";

const partnersDir = join(process.cwd(), "content/partners");

export default function getPartners(fields = []) {
  const slugs = getCollectionSlugs(partnersDir);
  const partners = [];
  slugs.forEach((slug) => {
    const partner = getCollectionBySlug(partnersDir, slug, fields);
    partners.push(partner.data);
  });
  return partners;
}
