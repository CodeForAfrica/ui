import { join } from "path";

import getCollectionData from "./getCollectionData";

const teamDir = join(process.cwd(), "content/team");

export default function getTeam(fields) {
  const teams = getCollectionData(teamDir, fields);
  return teams.map((member) => {
    return { ...member, href: `/about/members/${member.slug}` };
  });
}
