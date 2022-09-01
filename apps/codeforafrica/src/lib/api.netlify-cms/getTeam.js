import { join } from "path";

import getCollectionData from "./getCollectionData";

const teamDir = join(process.cwd(), "content/team");

export default function getTeam(fields) {
  const teams = getCollectionData(teamDir, fields);
  return teams
    .filter((member) => !member.deactivated)
    .map(({ slug = null, ...other }) => {
      const href = slug ? `/about/members/${slug}` : null;
      return { ...other, slug, href };
    });
}
