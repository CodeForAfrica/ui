import { imageFromMedia } from "@/codeforafrica/lib/data/utils";

async function partners(api, context) {
  const { params, locale } = context;
  const slug = params.slugs[2];
  const { docs } = await api.getCollection("partners", {
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
  const [partner] = docs;
  return {
    blocks: [
      {
        relatedProjects: [], // TODO(koechkevin) Related projects go here once projects implemented
        ...partner,
        logo: imageFromMedia(partner.logo),
        blockType: "partner",
      },
    ],
  };
}

export default partners;