import GhostContentAPI from "@tryghost/content-api";

import convertToCamelCase from "@/codeforafrica/utils/camelcaseKeys";

// const { GHOST_URL } = process.env;
const { GHOST_URL } = "https://longform.codeforafrica.org";
const { GHOST_API_KEY } = process.env;

export async function getAllPosts(options) {
  const { limit = 10, page = 1, ...other } = options || {};

  const api = new GhostContentAPI({
    url: GHOST_URL,
    key: GHOST_API_KEY,
    version: "v3.0",
  });

  const posts = await api.posts.browse({
    limit,
    page,
    fields: "id,title,slug,published_at,feature_image,excerpt",
    include: "authors,tags",
    ...other,
  });
  return convertToCamelCase(posts);
}

export async function getPost(slug) {
  const api = new GhostContentAPI({
    url: GHOST_URL,
    key: GHOST_API_KEY,
    version: "v3.0",
  });

  const posts = await api.posts.read({
    slug,
    fields:
      "id,title,slug,published_at,feature_image,excerpt,custom_excerpt,excerpt,html",
    include: "authors",
  });
  return convertToCamelCase(posts);
}

export async function getAllTags(options) {
  const api = new GhostContentAPI({
    url: GHOST_URL,
    key: GHOST_API_KEY,
    version: "v3.0",
  });

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
