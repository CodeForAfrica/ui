import { join } from "path";

import getCollectionData from "./getCollectionData";

const donorsDir = join(process.cwd(), "content/donors");

export default function getDonors(fields) {
  const donors = getCollectionData(donorsDir, fields);
  return donors;
}
