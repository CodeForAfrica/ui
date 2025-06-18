async function collectionOverview(block) {
  const { blockType, collections, ...other } = block;
  const values = collections.map(({ value }) => {
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
    collections: values,
    blockType,
    slug: blockType,
  };
}

export default collectionOverview;
