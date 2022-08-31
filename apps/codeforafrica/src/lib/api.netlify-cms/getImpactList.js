import { join } from "path";

import getCollectionData from "./getCollectionData";

const impactDir = join(process.cwd(), "content/impact");

function getImpactList() {
  return getCollectionData(impactDir, [
    "id",
    "slug",
    "title",
    "value",
    "image",
    "content",
  ]);
}

export default getImpactList;
