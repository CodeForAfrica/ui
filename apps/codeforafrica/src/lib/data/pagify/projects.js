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
  return {
    blocks: [
      {
        ...project,
        tag: project.tag?.name,
        donors: {
          title: "Donors",
          list: project.donors,
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
