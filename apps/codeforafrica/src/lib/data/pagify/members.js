import { imageFromMedia } from "@/codeforafrica/lib/data/utils";

async function members(api, context) {
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
  const [member] = docs;
  const meta = {
    title: member.name,
    description: member.decription,
    image: member.image,
  };
  return {
    blocks: [
      {
        relatedProjects: [],
        ...member,
        user: true,
        logo: imageFromMedia(member.image),
        blockType: "about-page-entity",
      },
    ],
    meta,
  };
}

export default members;
