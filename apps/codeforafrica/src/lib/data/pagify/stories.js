import { formatTags } from "@/codeforafrica/lib/data/utils/stories";
import formatDate from "@/codeforafrica/utils/formatDate";

async function stories(api, context) {
  const { params, locale } = context;
  const page = params.slugs[1];
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
        tags: formatTags(tags),
        meta: articleMeta,
        publishedOn: formatDate(publishedOn, {
          includeTime: false,
          month: "short",
        }),
        page,
        blockType: "article",
        ...other,
      },
    ],
    meta: articleMeta,
  };
}

export default stories;
