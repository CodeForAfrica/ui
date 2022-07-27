import { join } from "path";

import getCollectionData from "./getCollectionData";

const dir = join(process.cwd(), "content/guiding-principles");

export default function getGuidingPrinciples(fields) {
  return getCollectionData(dir, fields);
}
