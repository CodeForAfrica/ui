import { join } from "path";

import { marked } from "marked";

import { getCollectionBySlug } from "./utils";

const pagesDir = join(process.cwd(), "content/pages");
const FIELD_NAME = "our-mission";

export default function getOurMission() {
  const { "our-mission": ourMission } = getCollectionBySlug(pagesDir, "about", [
    FIELD_NAME,
    "slug",
  ]).items;
  ourMission.description = marked(ourMission.description);

  return ourMission;
}
