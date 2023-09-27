import formatDate from "@/codeforafrica/utils/formatDate";

export function formatTags(tags) {
  const excludedTags = new Set(["stories", "opportunities"]);

  const tagCounts = tags.reduce((counts, { name }) => {
    // eslint-disable-next-line no-param-reassign
    counts[name] = (counts[name] || 0) + 1;
    return counts;
  }, {});

  const sortedTags = Object.keys(tagCounts)
    .filter((tag) => !excludedTags.has(tag.toLowerCase()))
    .sort((a, b) => tagCounts[b] - tagCounts[a])
    .map((tagName) => {
      const tag = tags.find(({ name }) => name === tagName);
      return {
        name: tag.name,
        slug: tag.slug,
      };
    });

  return sortedTags;
}

export function formatPost(post, path) {
  const {
    id,
    title,
    coverImage: { src, alt },
    excerpt,
    slug,
    publishedOn,
    tags,
  } = post;
  if (!title) {
    return null;
  }
  return {
    id,
    title,
    image: { src, alt },
    excerpt,
    publishedOn: formatDate(publishedOn, {
      includeTime: false,
      month: "short",
    }),
    tags: formatTags(tags),
    href: `/posts/${path}/${slug}`,
  };
}

export async function getPosts(api, params, path) {
  const { page: queryPage = 1, tag, q, where = {}, ...other } = params;
  const options = {
    limit: 9,
    page: queryPage,
    where: {
      ...where,
      and: [
        {
          "tags.name": {
            contains: path,
          },
        },
      ],
      ...(tag && { "tags.slug": { like: tag } }),
      ...(q && {
        or: [
          {
            title: {
              contains: q,
            },
          },
          {
            "tags.name": {
              contains: q,
            },
          },
          {
            excerpt: {
              contains: q,
            },
          },
          {
            "content.richTextBlockFields.content.children.text": {
              like: q,
            },
          },
        ],
      }),
    },
    ...other,
  };

  const {
    docs: postList,
    totalPages,
    page,
  } = await api.getCollection("posts", options);

  const posts = postList.map((post) => formatPost(post, path));

  return {
    posts,
    pagination: {
      count: totalPages,
      page,
    },
  };
}

export async function getPost(api, slug, path) {
  const { docs } = await api.getCollection("posts", {
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  if (!docs?.length) {
    return null;
  }
  const [post] = docs;
  const {
    authors,
    title,
    coverImage,
    excerpt,
    tags,
    meta,
    publishedOn,
    ...other
  } = post;

  const postMeta = {
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
        publishedOn: formatDate(publishedOn, {
          includeTime: false,
          month: "short",
        }),
        path,
        blockType: "article",
        ...other,
      },
    ],
    meta: postMeta,
  };
}
