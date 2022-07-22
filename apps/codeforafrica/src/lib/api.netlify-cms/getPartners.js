import { join } from "path";

import getCollectionData from "./getCollectionData";

const partnersDir = join(process.cwd(), "content/partners");

export default function getPartners(fields) {
  const partners = getCollectionData(partnersDir, fields);
  return partners;
}
