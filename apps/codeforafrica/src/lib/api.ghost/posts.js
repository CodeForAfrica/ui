import GhostContentAPI from "@tryghost/content-api";

import convertToCamelCase from "@/codeforafrica/utils/camelcaseKeys";

function ghostAPI() {
  return new GhostContentAPI({
    url: process.env.GHOST_URL,
    key: process.env.GHOST_API_KEY,
    version: process.env.GHOST_API_VERSION || "v5.0",
  });
}

function transformPost(post) {
  const {
    customExcerpt,
    slug,
    primaryTag,
    publishedAt: publishedAtRaw,
    excerpt: originalExcerpt,
    ...other
  } = convertToCamelCase(post);

  const excerpt = customExcerpt || originalExcerpt || null;
  const href = `/${primaryTag.slug}/${slug}`;
  const publishedAt = new Date(publishedAtRaw).toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return {
    ...other,
    excerpt,
    publishedAt,
    href,
    slug,
    primaryTag,
  };
}

export async function getAllPosts() {
  const api = ghostAPI();

  const posts = await api.posts.browse({
    include: "authors,tags",
  });

  return posts.map(transformPost);
}

export async function getPost(slug) {
  const allPost = await getAllPosts();
  const post = allPost.find((p) => p.slug === slug);
  return post;
}
