import GhostContentAPI from "@tryghost/content-api";

const GHOST_API_URL = process.env.GHOST_CMS_URL;
const GHOST_API_KEY = process.env.GHOST_CMS_API_KEY;

const api = new GhostContentAPI({
  url: GHOST_API_URL,
  key: GHOST_API_KEY,
  version: "v3.0",
});

export async function getAllPosts(options) {
  const { limit = 10, page = 1, ...other } = options || {};

  const posts = await api.posts.browse({
    limit,
    page,
    fields: "id,title,slug,published_at,feature_image,excerpt",
    include: "authors,tags",
    ...other,
  });
  return posts;
}

export async function getPost(slug) {
  const posts = api.posts.read({
    slug,
    fields:
      "id,title,slug,published_at,feature_image,excerpt,custom_excerpt,excerpt,html",
    include: "authors",
  });
  return posts;
}

export async function getAllTags(options) {
  return api.tags.browse({
    fields: "id,name,slug",
    order: "name desc",
    ...options,
  });
}

export async function getPostsByTag(slug, options) {
  const optionsWithSlugFilter = { ...options, filter: `tag:${slug}` };
  const posts = await getAllPosts(optionsWithSlugFilter);
  return posts;
}

export async function getPostsByPrimaryTag(tag, options) {
  const optionsWithPrimaryTagFilter = {
    ...options,
    fields:
      "id,title,slug,published_at,feature_image,excerpt,custom_excerpt,html",
    filter: `primary_tag:${tag}`,
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
