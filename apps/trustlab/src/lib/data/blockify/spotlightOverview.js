import { getPost } from "@/trustlab/utils/post";

async function spotlightOverview(block, api) {
  const { blockType, items: collectionList, ...other } = block;
  const promises = collectionList.map(async ({ item, buttonLink = null }) => {
    const { excerpt, image = {}, title, tags = [], id, slug } = item;
    const post = await getPost(api, slug);
    const href = post?.link?.href || null;
    const [firstTag] = tags;

    return {
      excerpt,
      image: {
        src: image?.src || "",
        alt: image?.alt || "",
      },
      title,
      tag: firstTag?.name || null,
      id,
      href,
      buttonLink,
    };
  });

  const items = await Promise.all(promises);
  return {
    ...other,
    items,
    blockType,
    slug: blockType,
  };
}

export default spotlightOverview;
