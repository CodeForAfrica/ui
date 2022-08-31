import { join } from "path";

import getCollectionData from "./getCollectionData";
import { setSeo } from "./seo";

const teamDir = join(process.cwd(), "content/team");

export default function getTeam(fields) {
  const teams = getCollectionData(teamDir, fields);
  return teams
    .filter((member) => !member.deactivated)
    .map(({ slug = null, name, title, ...other }) => {
      const href = slug ? `/about/members/${slug}` : null;
      const seo = setSeo({
        title: name,
        description: title,
      });
      return { ...other, slug, href, name, title, seo };
    });
}
