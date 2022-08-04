import { join } from "path";

import { getCollectionBySlug } from "../utils";

const settingsPageDir = join(process.cwd(), "content/settings");

export default function getHeader(section = "footer") {
  return getCollectionBySlug(settingsPageDir, section).data;
}
