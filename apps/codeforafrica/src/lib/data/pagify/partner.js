import { imageFromMedia } from "@/codeforafrica/lib/data/utils";

async function partner(api, context) {
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
  const [doc] = docs;
  const meta = {
    title: doc.name,
    description: doc.decription,
    image: doc.image,
  };
  return {
    blocks: [
      {
        relatedProjects: [], // TODO(koechkevin) Related projects go here once projects implemented
        ...doc,
        logo: imageFromMedia(doc.logo),
        blockType: "about-page-entity",
      },
    ],
    meta,
  };
}

export default partner;
