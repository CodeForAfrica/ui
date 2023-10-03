import { imageFromMedia } from "@/codeforafrica/lib/data/utils";

async function member(api, context, parentPage) {
  const { params, locale } = context;
  const slug = params.slugs[2];
  const { docs } = await api.getCollection("members", {
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
    image: doc.image,
  };
  const { docs: relatedProjects } = await api.getCollection("projects", {
    locale,
    where: {
      team: {
        contains: doc.id,
      },
    },
  });
  const block = parentPage?.blocks?.find(
    ({ blockType }) => blockType === "our-team",
  );
  return {
    blocks: [
      {
        ...doc,
        relatedProjects: {
          title: block?.labels?.projects,
          list: relatedProjects,
        },
        user: true,
        logo: imageFromMedia(doc.image),
        blockType: "about-page-entity",
      },
    ],
    meta,
  };
}

export default member;
