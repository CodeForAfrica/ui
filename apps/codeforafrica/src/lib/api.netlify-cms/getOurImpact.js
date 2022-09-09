import { join } from "path";

import getImpactList from "./getImpactList";
import { getCollectionBySlug } from "./utils";

const pageDir = join(process.cwd(), "content/pages");
const FIELD_NAME = "our-impact";

export default function geOurImpact(page = "index") {
  const {
    "our-impact": {
      action = null,
      "impact-list": impactIds,
      title = null,
      slug = null,
    },
  } = getCollectionBySlug(pageDir, page, [FIELD_NAME, "slug"]).items;
  const impact = getImpactList();
  // Need to maintain order of how impact were selected in ourImpact
  const list = impactIds?.map((id) => impact.find((i) => i.id === id)) ?? null;

  return { action, list, title, slug };
}
