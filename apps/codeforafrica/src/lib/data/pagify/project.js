import formatDate from "@/codeforafrica/utils/formatDate";

async function project(api, context) {
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
  const [doc] = docs;
  const meta = {
    title: doc.name,
    description: doc.decription,
    image: doc.logo,
  };
  const { docs: relatedProjects } = await api.getCollection("projects", {
    locale,
    where: {
      "tag.name": {
        equals: doc.tag?.name,
      },
    },
  });
  return {
    meta,
    blocks: [
      {
        ...doc,
        descriptionTitle: "Description",
        tag: doc.tag?.name ?? null,
        donors: {
          title: "Donors",
          list: doc.donors,
        },
        team: {
          title: "Team",
          team: doc?.team ?? null,
        },
        relatedProjects: {
          title: "Related Projects",
          projects: relatedProjects,
        },
        badges: doc.badges.map(({ name, date }) => ({
          name,
          date: formatDate(date, {
            includeTime: false,
            month: "short",
          }),
        })),
        partners: { list: doc.partners, title: "Partners" },
        blockType: "project",
      },
    ],
  };
}

export default project;
