import { join } from "path";

import { marked } from "marked";

import getBadges from "./getBadges";
import getDonors from "./getDonors";
import getPartners from "./getPartners";
import { getCollectionSlugs, getCollectionBySlug } from "./utils";

const projectsDir = join(process.cwd(), "content/projects");

export default function getProjects(fields) {
  const slugs = getCollectionSlugs(projectsDir);
  return slugs.map((_slug) => {
    const collection = getCollectionBySlug(projectsDir, _slug, fields);
    const project = collection.items;
    if (fields.includes("badges")) {
      const badges = getBadges(["id", "name", "content", "date"]);
      project.badges = badges?.filter((badge) =>
        project.badges.includes(badge.id)
      );
    }
    if (fields.includes("partners")) {
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
        list: partners?.filter((partner) =>
          project.partners.includes(partner.id)
        ),
      };
    }
    if (fields.includes("donors")) {
      const donors = getDonors();
      project.donors = {
        title: "Donors",
        list: donors?.filter((donor) => project.donors.includes(donor.id)),
      };
    }
    project.subtitle = marked(project.subtitle);
    project.href = `/projects/${project.slug}`;
    return project;
  });
}
