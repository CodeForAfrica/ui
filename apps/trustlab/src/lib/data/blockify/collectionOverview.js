async function collectionOverview(block) {
  const { blockType, items: collectionList, ...other } = block;
  const items = collectionList.map(({ value }) => {
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
    items,
    blockType,
    slug: blockType,
  };
}

export default collectionOverview;
