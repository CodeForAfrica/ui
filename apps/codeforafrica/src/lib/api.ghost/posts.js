import fs from "fs";
import path from "path";

import GhostContentAPI from "@tryghost/content-api";

import convertToCamelCase from "@/codeforafrica/utils/camelcaseKeys";

const cacheDir = path.join(process.env.PWD, "public/data");

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

async function cachePosts(posts) {
  const cacheFile = path.join(cacheDir, "posts.json");
  const data = {
    date: new Date().toISOString(),
    posts,
  };
  fs.writeFileSync(cacheFile, JSON.stringify(data));
}

async function getCachedPosts() {
  try {
    const cacheFile = path.join(cacheDir, "posts.json");
    const data = fs.readFileSync(cacheFile);
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

export async function getAllPosts() {
  // Check if we have a cached version of the posts
  const cachedPosts = await getCachedPosts();
  if (cachedPosts) {
    // check if the cache is older than 5 mins
    // is 5 mins a good cache age?
    // TODO: make this configurable
    const cacheAge = new Date() - new Date(cachedPosts.date);
    if (cacheAge < 300000) {
      return cachedPosts.posts;
    }
  }

  // If not, fetch from Ghost

  const api = ghostAPI();

  const posts = await api.posts.browse({
    include: "authors,tags",
  });

  const allPosts = posts.map(transformPost);

  // Cache the posts
  await cachePosts(allPosts);

  return allPosts;
}

export async function getPost(slug) {
  const allPost = await getAllPosts();
  const post = allPost.find((p) => p.slug === slug);
  return post;
}
