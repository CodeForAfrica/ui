import { join } from "path";

import getCollectionData from "./getCollectionData";

const teamDir = join(process.cwd(), "content/team");

export default function getTeam(fields) {
  const team = getCollectionData(teamDir, fields);
  team.reduce((acc, curr) => {
    const member = curr;
    member.href = `/about/members/${member.slug}`;
    return acc;
  }, []);
  return team;
}
