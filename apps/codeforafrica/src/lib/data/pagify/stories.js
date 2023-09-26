import formatDate from "@/codeforafrica/utils/formatDate";

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
  const {
    authors,
    title,
    coverImage,
    excerpt,
    tags,
    meta,
    publishedOn,
    ...other
  } = story;
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
        authors: authors.map(({ fullName }) => {
          return {
            name: fullName,
            bio: "",
          };
        }),
        title,
        coverImage,
        excerpt,
        tags: tags.map(({ name }) => name),
        meta: articleMeta,
        publishedOn: formatDate(publishedOn, {
          includeTime: false,
          month: "short",
        }),
        post: "stories",
        blockType: "article",
        ...other,
      },
    ],
    meta: articleMeta,
  };
}

export default stories;
