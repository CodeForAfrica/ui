import { imageFromMedia } from "@/codeforafrica/lib/data/utils";

export default function formatImpacts(impacts) {
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
