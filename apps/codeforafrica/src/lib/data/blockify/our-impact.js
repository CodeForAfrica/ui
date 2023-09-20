import { imageFromMedia } from "@/codeforafrica/lib/data/utils";

function ourImpact(block) {
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
    slug: "our-impact",
  };
}

export default ourImpact;
