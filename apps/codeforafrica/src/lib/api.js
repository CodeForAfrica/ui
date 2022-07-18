import GhostContentAPI from "@tryghost/content-api";

// const GHOST_API_URL = process.env.GHOST_CMS_URL;
const GHOST_API_URL = "https://cms.codeforafrica.org";
const GHOST_API_KEY = process.env.GHOST_CMS_API_KEY;

const api = new GhostContentAPI({
  url: GHOST_API_URL,
  key: GHOST_API_KEY,
  version: "v3.0",
});

export async function getAllPosts(limit = 10, page = 1) {
  const posts = await api.posts.browse({
    limit,
    page,
    fields: "id,title,slug,published_at,feature_image,excerpt",
    // include: "authors,tags",
  });
  return posts;
}

export async function getPost(slug) {
  const posts = api.posts.read({
    slug,
    fields:
      "id,title,slug,published_at,feature_image,excerpt,custom_excerpt,excerpt,html",
    // include: "authors,tags",
  });
  return posts;
}

export async function getAllTags() {
  return api.tags.browse({
    fields: "id,name,slug",
    order: "name desc",
  });
}

export function getPostByTag(slug, limit = 10, page = 1) {
  const posts = api.posts.browse({
    limit,
    page,
    fields: "id,title,slug,published_at,feature_image,excerpt,custom_excerpt",
    filter: `tag:${slug}`,
    include: "authors,tags",
  });
  return posts;
}

export async function getPostsByPrimaryTag(tag, limit = 10, page = 1) {
  const posts = api.posts.browse({
    limit,
    page,
    fields: "id,title,slug,published_at,feature_image,excerpt,custom_excerpt",
    filter: `primary_tag:${tag}`,
    include: "authors,tags",
  });
  return posts;
}

export async function getAllPostsWithSlug() {
  const params = {
    fields: "slug",
    limit: "all",
  };
  const posts = await api.posts.browse(params);
  return posts;
}
