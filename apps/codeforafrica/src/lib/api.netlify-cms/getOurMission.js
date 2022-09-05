import { join } from "path";

import { getCollectionBySlug } from "./utils";

import marked from "@/codeforafrica/lib/marked";

const pagesDir = join(process.cwd(), "content/pages");

export default function getOurMission() {
  const { "our-mission": ourMission } = getCollectionBySlug(pagesDir, "about", [
    "our-mission",
  ]).items;
  ourMission.description = marked(ourMission.description);

  return ourMission;
}
