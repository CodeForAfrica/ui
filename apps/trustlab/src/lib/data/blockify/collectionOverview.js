function getSpotlightButtonLink(post) {
  if (post?.isApplication) {
    return {
      href: post.applicationLink?.href ?? "",
      label: post.applicationLink?.label || "Apply",
    };
  }
  return {
    href: post?.link?.href || "",
    label: post?.link?.label || "Read",
  };
}
async function collectionOverview(block, api) {
  const { blockType, items: collectionList, ...other } = block;
  const slugs = collectionList.map(({ value }) => value?.slug).filter(Boolean);

  const postsBySlug = new Map();
  if (slugs.length) {
    const { docs } = await api.getCollection("posts", {
      limit: slugs.length,
      where: {
        slug: { in: slugs },
      },
    });

    docs.forEach((post) => {
      postsBySlug.set(post.slug, post);
    });
  }

  const items = collectionList.map(({ value }) => {
    const { excerpt, image = {}, title, tags = [], id, slug } = value;
    const post = postsBySlug.get(slug);
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
  return {
    ...other,
    items,
    blockType,
    slug: blockType,
  };
}

export default collectionOverview;
