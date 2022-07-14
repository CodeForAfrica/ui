import { join } from "path";

import { getCollectionSlugs, getCollectionBySlug } from "./utils";

const badgesDir = join(process.cwd(), "content/badges");

export default function getBadges() {
  const slugs = getCollectionSlugs(badgesDir);
  const badges = [];
  slugs.forEach((slug) => {
    const badge = getCollectionBySlug(badgesDir, slug);
    badges.push(badge.data);
  });
  return badges;
}
