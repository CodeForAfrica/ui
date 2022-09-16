import { join } from "path";

import { getCollectionBySlug } from "./utils";

import marked from "@/codeforafrica/lib/marked";

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
