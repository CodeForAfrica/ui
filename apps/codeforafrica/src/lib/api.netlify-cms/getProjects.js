import { join } from "path";

import getBadges from "./getBadges";
import getDonors from "./getDonors";
import getPartners from "./getPartners";
import getTeam from "./getTeam";
import { getCollectionSlugs, getCollectionBySlug } from "./utils";

import marked from "@/codeforafrica/lib/marked";

const projectsDir = join(process.cwd(), "content/projects");

export default function getProjects(fields) {
  const slugs = getCollectionSlugs(projectsDir);
  return slugs.map((_slug) => {
    const collection = getCollectionBySlug(projectsDir, _slug, fields);
    const project = collection.items;
    if (project.badges?.length) {
      const badges = getBadges(["id", "name", "content", "date"]);
      project.badges = project.badges.map((id) =>
        badges.find((badge) => badge.id === id)
      );
    }
    if (project.partners?.length) {
      const partners = getPartners([
        "id",
        "slug",
        "name",
        "content",
        "href",
        "logo",
      ]);
      project.partners = {
        title: "Partners",
        list: project.partners.map((id) =>
          partners.find((partner) => partner.id === id)
        ),
      };
    }
    if (project.donors?.length) {
      const donors = getDonors();
      project.donors = {
        title: "Donors",
        list: project.donors.map((id) =>
          donors.find((donor) => donor.id === id)
        ),
      };
    }

    if (project.team?.length) {
      const team = getTeam();
      project.team = {
        title: "Team",
        list: project.team.map((id) => team.find((m) => m.id === id)),
      };
    }

    project.subtitle = marked(project.subtitle);
    project.href = `/projects/${project.slug}`;
    return project;
  });
}
