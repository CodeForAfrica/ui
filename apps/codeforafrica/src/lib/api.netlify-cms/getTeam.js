import { join } from "path";

import getCollectionData from "./getCollectionData";

const teamDir = join(process.cwd(), "content/team");

export default function getTeam(fields) {
  const teams = getCollectionData(teamDir, fields);
  teams.map((team) => {
    const member = team;
    member.href = `/about/members/${member.slug}`;
    return member;
  }, []);
  return teams;
}
