import { join } from "path";

import { getCollectionSlugs, getCollectionBySlug } from "./utils";

const donorsDir = join(process.cwd(), "content/donors");

export default function getDonors(fields = []) {
  const slugs = getCollectionSlugs(donorsDir);
  const donors = [];
  slugs.forEach((slug) => {
    const donor = getCollectionBySlug(donorsDir, slug, fields);
    donors.push(donor.data);
  });
  return donors;
}
