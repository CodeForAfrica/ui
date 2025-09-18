import { getPost } from "@/trustlab/utils/post";

function getSpotlightButtonLink(post) {
  if (post.isApplication) {
    return {
      href: post.applicationLink?.href ?? "",
      label: post.applicationLink?.label || "Apply",
    };
  }
  return {
    href: post.link?.href || "",
    label: post.link?.label || "Read",
  };
}
async function collectionOverview(block, api) {
  const { blockType, items: collectionList, ...other } = block;
  const promises = collectionList.map(async ({ value }) => {
    const { excerpt, image = {}, title, tags = [], id, slug } = value;
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
      buttonLink: getSpotlightButtonLink(post),
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

export default collectionOverview;
