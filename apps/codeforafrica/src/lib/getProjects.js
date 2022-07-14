import { join } from "path";

import getBadges from "./getBadges";
import getDonors from "./getDonors";
import getPartners from "./getPartners";
import { getCollectionSlugs, getCollectionBySlug } from "./utils";

const projectsDir = join(process.cwd(), "content/projects");

export default function getProjects(fields = []) {
  const slugs = getCollectionSlugs(projectsDir);
  const projects = [];
  slugs.forEach((_slug) => {
    const collection = getCollectionBySlug(projectsDir, _slug, fields);
    const project = collection.items;
    if (fields.includes("badges")) {
      const badges = getBadges();
      project.badges = badges.filter((badge) =>
        collection.data.badges.id.includes(badge.id)
      );
    }
    if (fields.includes("partners")) {
      const partners = getPartners();
      project.partners = partners.filter((partner) =>
        collection.data.partners.includes(partner.id)
      );
    }
    if (fields.includes("donors")) {
      const donors = getDonors();
      project.donors = donors.filter((donor) =>
        collection.data.donors.includes(donor.id)
      );
    }
    if (fields.includes("links")) {
      project.links = collection.data.links.map(
        ({ link: { slug, content, href } }) => {
          return { slug, content, href };
        }
      );
    }
    projects.push(project);
  });
  return projects;
}
