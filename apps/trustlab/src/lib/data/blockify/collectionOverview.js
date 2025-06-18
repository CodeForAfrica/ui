async function collectionOverview(block) {
  const { blockType, collections: collectionList, ...other } = block;
  const collections = collectionList.map(({ value }) => {
    const { excerpt, image = {}, title, tags = [], id, link = {} } = value;

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
      href: link?.href || "",
    };
  });

  return {
    ...other,
    collections,
    blockType,
    slug: blockType,
  };
}

export default collectionOverview;
