async function stories(api, context) {
  const { params, locale } = context;
  const slug = params.slugs[2];
  const { docs } = await api.getCollection("posts", {
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  if (!docs?.length) {
    return null;
  }
  const [story] = docs;
  const { authors, title, coverImage, excerpt, tags, meta, ...other } = story;
  const articleMeta = {
    title,
    description: excerpt,
    image: coverImage,
    ...meta,
  };
  return {
    title,
    blocks: [
      {
        authors: authors.map(({ fullName }) => fullName),
        title,
        coverImage,
        excerpt,
        tags: tags.map(({ name }) => name),
        meta: articleMeta,
        blockType: "article",
        ...other,
      },
    ],
    meta: articleMeta,
  };
}

export default stories;
