import GhostContentAPI from "@tryghost/content-api";

import convertToCamelCase from "@/codeforafrica/utils/camelcaseKeys";

function ghostAPI() {
  return new GhostContentAPI({
    url: process.env.GHOST_URL,
    key: process.env.GHOST_API_KEY,
    version: process.env.GHOST_API_VERSION || "v5",
  });
}

function transformGhostPost(post) {
  const {
    customExcerpt,
    publishedAt: publishedAtRaw,
    excerpt: originalExcerpt,
    ...other
  } = convertToCamelCase(post);

  const excerpt = customExcerpt || originalExcerpt || null;
  const publishedAt = new Date(publishedAtRaw).toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return { ...other, excerpt, publishedAt };

  // return convertToCamelCase(post);
}

export async function getAllPosts(options) {
  const { limit = 10, page = 1, ...other } = options || {};

  const api = ghostAPI();

  const posts = await api.posts.browse({
    limit,
    page,
    fields: "id,title,slug,published_at,feature_image,excerpt",
    include: "authors,tags",
    ...other,
  });

  return posts.map(transformGhostPost);
}

export async function getPost(slug) {
  const api = ghostAPI();

  const post = await api.posts.read({
    slug,
    fields:
      "id,title,slug,published_at,feature_image,excerpt,custom_excerpt,html",
    include: "authors",
  });

  return transformGhostPost(post);
}

export async function getAllTags(options) {
  const api = ghostAPI();

  const tags = api.tags.browse({
    fields: "id,name,slug",
    order: "name desc",
    ...options,
  });
  return convertToCamelCase(tags);
}

export async function getPostsByTag(tag, options) {
  const optionsWithSlugFilter = { ...options, filter: `tag:${tag}` };
  const posts = await getAllPosts(optionsWithSlugFilter);
  return posts;
}

export async function getPostsByPrimaryTag(tag, options) {
  const optionsWithPrimaryTagFilter = {
    ...options,
    fields:
      "id,title,slug,published_at,feature_image,excerpt,custom_excerpt,html",
    filter: `primary_tag:${tag}`,
    include: "tags",
  };

  const posts = await getAllPosts(optionsWithPrimaryTagFilter);
  return posts;
}

export async function getAllPostsWithSlug(tag, options) {
  const optionsWithPrimaryTagFilter = {
    ...options,
    fields: "slug",
    limit: "all",
    filter: `primary_tag:${tag}`,
  };
  // const posts = await api.posts.browse(params);
  const posts = await getAllPosts(optionsWithPrimaryTagFilter);
  return posts;
}
