import { join } from "path";

import getCollectionData from "./getCollectionData";

const impactDir = join(process.cwd(), "content/impact");

function getImpactList(fields) {
  return getCollectionData(impactDir, fields);
}

export default getImpactList;
