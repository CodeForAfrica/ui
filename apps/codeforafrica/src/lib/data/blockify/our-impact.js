import { imageFromMedia } from "@/codeforafrica/lib/data/utils";

export function formatImpacts(impacts) {
  return impacts.map((impact) => {
    const { icon: media, title, ...rest } = impact;
    const image = imageFromMedia({ alt: title, ...media });
    return {
      ...rest,
      image,
      title,
    };
  });
}

function ourImpact(block) {
  const { impacts, ...other } = block;
  const ourImpacts = formatImpacts(impacts);

  return {
    ...other,
    impacts: ourImpacts,
    slug: "our-impact",
  };
}

export default ourImpact;
