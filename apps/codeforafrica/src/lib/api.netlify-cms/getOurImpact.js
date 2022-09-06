import { join } from "path";

import getImpactList from "./getImpactList";
import { getCollectionBySlug } from "./utils";

const pageDir = join(process.cwd(), "content/pages");

export default function geOurImpact(page = "index") {
  const {
    "our-impact": { action = null, "impact-list": impactIds, title = null },
  } = getCollectionBySlug(pageDir, page, ["our-impact"]).items;
  const impact = getImpactList();
  // Need to maintain order of how impact were selected in ourImpact
  const list = impactIds?.map((id) => impact.find((i) => i.id === id)) ?? null;

  return { action, list, title, slug: "our-impact" };
}
