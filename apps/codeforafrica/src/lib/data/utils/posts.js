import formatDate from "@/codeforafrica/utils/formatDate";

export function formatPost(post, page) {
  const {
    id,
    title,
    coverImage: { src, alt },
    excerpt,
    slug,
    publishedOn,
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
    href: `/posts/${page}/${slug}`,
  };
}

export async function getPosts(api, params, page) {
  const { page: queryPage = 1, tag, q, where = {}, ...other } = params;
  const options = {
    limit: 9,
    page: queryPage,
    where: {
      ...where,
      and: [
        {
          "tags.name": {
            contains: page,
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
    page: newPage,
  } = await api.getCollection("posts", options);

  const posts = postList.map((post) => formatPost(post, page));

  return {
    posts,
    pagination: {
      count: totalPages,
      page: newPage,
    },
  };
}

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
    .map((tag) => tags.find(({ name }) => name === tag));

  return sortedTags;
}
