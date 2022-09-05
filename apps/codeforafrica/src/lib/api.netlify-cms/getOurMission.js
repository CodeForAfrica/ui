import { join } from "path";
import marked from "@/codeforafrica/lib/marked";

import { getCollectionBySlug } from "./utils";

const pagesDir = join(process.cwd(), "content/pages");

export default function getOurMission() {
  const { "our-mission": ourMission } = getCollectionBySlug(pagesDir, "about", [
    "our-mission",
  ]).items;
  ourMission.description = marked(ourMission.description);

  return ourMission;
}
