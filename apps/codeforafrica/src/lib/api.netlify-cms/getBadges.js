import { join } from "path";

import getCollectionData from "./getCollectionData";

const badgesDir = join(process.cwd(), "content/badges");

export default function getBadges(fields) {
  const badges = getCollectionData(badgesDir, fields);
  return badges;
}
