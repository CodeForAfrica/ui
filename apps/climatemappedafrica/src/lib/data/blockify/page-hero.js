import { imageFromMedia } from "@/climatemappedafrica/lib/data/utils";

async function pageHero({ block }) {
  const { background: media, ...others } = block;
  let background = null;
  if (media) {
    background = imageFromMedia(media);
  }
  return {
    ...others,
    background,
    slug: block.blockType,
  };
}

export default pageHero;
