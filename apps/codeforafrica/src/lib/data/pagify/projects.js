import formatDate from "@/codeforafrica/utils/formatDate";

async function projects(api, context) {
  const { params, locale } = context;
  const slug = params.slugs[2];
  const { docs } = await api.getCollection("projects", {
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  if (!docs?.length) {
    return null;
  }
  const [project] = docs;
  const meta = {
    title: project.name,
    description: project.decription,
    image: project.logo,
  };
  const { docs: relatedProjects } = await api.getCollection("projects", {
    locale,
    where: {
      "tag.name": {
        equals: project.tag?.name,
      },
    },
  });
  return {
    meta,
    blocks: [
      {
        ...project,
        tag: project.tag?.name,
        donors: {
          title: "Donors",
          list: project.donors,
        },
        team: {
          title: "Team",
          team: project?.team ?? null,
        },
        relatedProjects: {
          title: "Related Projects",
          projects: relatedProjects,
        },
        badges: project.badges.map(({ name, date }) => ({
          name,
          date: formatDate(date, {
            includeTime: false,
            month: "short",
          }),
        })),
        partners: { list: project.partners, title: "Partners" },
        externalHref: project.externalHref?.url,
        blockType: "project",
      },
    ],
  };
}

export default projects;
