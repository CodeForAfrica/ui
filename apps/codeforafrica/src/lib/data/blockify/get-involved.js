import { imageFromMedia } from "@/codeforafrica/lib/data/utils";

function getInvolved(block) {
  const { impacts, ...other } = block;
  const ourImpacts = impacts.map((impact) => {
    const { icon: media, title, ...rest } = impact;
    const image = imageFromMedia({ alt: title, ...media });
    return {
      ...rest,
      image,
      title,
    };
  });

  return {
    ...other,
    impacts: ourImpacts,
    slug: "get-involved",
  };
}

export default getInvolved;
