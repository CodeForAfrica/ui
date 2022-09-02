import { join } from "path";

import { marked } from "marked";

import { getCollectionBySlug } from "./utils";

import DOMPurify from "@/codeforafrica/utils/dompurifyMarked";

const pagesDir = join(process.cwd(), "content/pages");

export default function getOurMission() {
  const { "our-mission": ourMission } = getCollectionBySlug(pagesDir, "about", [
    "our-mission",
  ]).items;
  ourMission.description = DOMPurify.sanitize(marked(ourMission.description));

  return ourMission;
}
