import formatDate from "@/codeforafrica/utils/formatDate";

async function project(api, context, parentPage) {
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
  const block = parentPage.blocks.find(
    ({ blockType }) => blockType === "our-work",
  );
  return {
    meta,
    blocks: [
      {
        ...doc,
        descriptionTitle: block?.labels?.description,
        tag: doc.tag?.name ?? null,
        donors: {
          title: block?.labels?.donors,
          list: doc.donors,
        },
        team: {
          title: block?.labels?.team,
          team: doc?.team ?? null,
        },
        relatedProjects: {
          title: block?.labels?.projects,
          projects: relatedProjects,
        },
        badges: doc.badges.map(({ name, date }) => ({
          name,
          date: formatDate(date, {
            includeTime: false,
            month: "short",
          }),
        })),
        partners: { list: doc.partners, title: block?.labels?.partners },
        blockType: "project",
      },
    ],
  };
}

export default project;
