import { join } from "path";

import { marked } from "marked";

import { getCollectionBySlug } from "../utils";

const indexPageDir = join(process.cwd(), "content/pages");

export default function getMeetOurTeam(
  page = "index",
  fields = ["meet-our-team"]
) {
  const meetOurTeam = getCollectionBySlug(indexPageDir, page, fields).items[
    "meet-our-team"
  ];
  meetOurTeam.logo = meetOurTeam.image?.src;
  meetOurTeam.description = marked(meetOurTeam.description);
  meetOurTeam.slug = "meet-our-team";
  return meetOurTeam;
}
