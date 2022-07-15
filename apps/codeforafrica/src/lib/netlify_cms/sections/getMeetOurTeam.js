import { join } from "path";

import { getCollectionBySlug } from "../utils";

const indexPageDir = join(process.cwd(), "content/pages");

export default function getMeetOurTeam(
  page = "index",
  fields = ["meet_our_team"]
) {
  const meetOurTeam = getCollectionBySlug(indexPageDir, page, fields).items
    .meet_our_team;
  meetOurTeam.logo = meetOurTeam.image.src;
  return meetOurTeam;
}
