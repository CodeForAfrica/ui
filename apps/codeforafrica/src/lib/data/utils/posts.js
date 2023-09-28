import formatDate from "@/codeforafrica/utils/formatDate";

export function formatTags(tags) {
  const excludedTags = ["stories", "opportunities"];

  const filteredTags = tags.filter(
    (tag) => !excludedTags.includes(tag.name.toLowerCase()),
  );

  const distinctTags = [
    ...new Set(filteredTags.map((tag) => tag.name.toLowerCase())),
  ];

  const sortedTags = distinctTags.sort().map((tagName) => {
    return filteredTags.find((tag) => tag.name.toLowerCase() === tagName);
  });
  return sortedTags;
}

export function formatPost(post, primaryTag) {
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
    href: `/posts/${primaryTag}/${slug}`,
    slug,
  };
}

export async function getPosts(api, params, primaryTag) {
  const { page: queryPage = 1, tag, q, ...other } = params;
  const options = {
    limit: 9,
    page: queryPage,
    where: {
      and: [
        {
          "tags.name": {
            contains: primaryTag,
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

  const posts = postList.map((post) => formatPost(post, primaryTag));

  return {
    posts,
    pagination: {
      count: totalPages,
      page,
    },
  };
}

export async function getPost(api, slug, primaryTag) {
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
        authors: authors.map(({ fullName, bio }) => {
          return {
            name: fullName,
            bio,
          };
        }),
        title,
        coverImage,
        excerpt,
        tags,
        publishedOn: formatDate(publishedOn, {
          includeTime: false,
          month: "short",
        }),
        primaryTag,
        blockType: "article",
        ...other,
      },
    ],
    meta: postMeta,
  };
}

export async function getTagsByPrimaryTag(api, primaryTag) {
  const { docs: posts } = await api.getCollection("posts", {
    limit: 0,
    where: {
      "tags.name": {
        like: primaryTag,
      },
    },
  });
  const allTags = posts.reduce((acc, story) => {
    const { tags = [] } = story;
    return [...acc, ...tags.map(({ name, slug }) => ({ name, slug }))];
  }, []);

  const tags = formatTags(allTags);

  return tags;
}
