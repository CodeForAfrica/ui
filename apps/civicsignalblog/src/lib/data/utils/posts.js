import { sortTags } from "@/civicsignalblog/lib/data/utils/tags";
import formatDate from "@/civicsignalblog/utils/formatDate";
import site from "@/civicsignalblog/utils/site";

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
    tags,
    // NOTE(kilemensi): Control URL structure for posts
    href: `/posts/${primaryTag}/${slug}`,
    slug,
  };
}

export async function getPosts(api, params, primaryTag) {
  const { page: queryPage = 1, tag, q, where, ...other } = params;
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
      ...where,
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

export async function getPost(api, slug, primaryTag, options) {
  const { docs } = await api.getCollection("posts", {
    ...options,
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
    excerpt = null,
    tags = [],
    meta,
    publishedOn,
    updatedAt,
    ...other
  } = post;

  const postMeta = {
    canonical: `${site.environmentUrl}posts/${primaryTag}/${slug}`,
    description: excerpt,
    image: coverImage ?? null,
    article: {
      authors: authors?.map((a) => a.fullName || a.bio) ?? null,
      publishedAt: publishedOn,
      tags: tags.length ? tags.map((t) => t.name) : null,
      updatedAt,
    },
    ...meta,
  };
  const blocks = [
    {
      authors:
        authors?.map(({ fullName, bio }) => {
          return {
            name: fullName.trim(),
            bio: bio?.trim() || null,
          };
        }) ?? null,
      title,
      coverImage,
      excerpt,
      tags,
      publishedAt: publishedOn,
      publishedOn: formatDate(publishedOn, {
        includeTime: false,
        month: "short",
      }),
      primaryTag,
      blockType: "article",
      updatedAt,
      // NOTE(kilemensi): handle locale if/when used
      url: `${site.environmentUrl}posts/${primaryTag}/${slug}`,
      ...other,
    },
  ];

  const publicationSettings = await api.findGlobal("settings-publication");
  const primaryTagPostSettings = publicationSettings?.[primaryTag] ?? {};
  const { showRecent, title: recentTitle } = primaryTagPostSettings;
  if (showRecent) {
    const { posts } = await getPosts(
      api,
      {
        limit: 3,
        where: {
          slug: {
            not_equals: slug,
          },
        },
      },
      primaryTag,
    );
    blocks.push({
      title: recentTitle,
      posts,
      blockType: "recent-posts",
    });
  }

  return {
    title,
    blocks,
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
  const allTags = posts.flatMap((post) => post.tags ?? []);
  return sortTags(allTags);
}
