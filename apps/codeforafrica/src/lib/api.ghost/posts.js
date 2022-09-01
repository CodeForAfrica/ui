import { promises as fs } from "fs";
import { join } from "path";

import camelcaseKeys from "camelcase-keys";

import initializeContentAPI from "@/codeforafrica/lib/api.ghost/ghost";
import equalsIgnoreCase from "@/codeforafrica/utils/equalsIgnoreCase";

const cacheDir = join(process.cwd(), "public/data");

function transformPost(post) {
  const {
    customExcerpt,
    excerpt: originalExcerpt,
    primaryTag,
    publishedAt: publishedAtRaw,
    slug,
    tags: originalTags,
    metaTitle,
    metaDescription,
    title,
    ogImage,
    ogTitle,
    primaryAuthor,
    ...other
  } = camelcaseKeys(post, { deep: true });

  const excerpt = customExcerpt || originalExcerpt || null;
  const href = `/${primaryTag.slug}/${slug}`;
  const publishedAt = new Date(publishedAtRaw).toLocaleDateString("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const seo = {
    title,
    description: excerpt,
    openGraph: {
      title: metaTitle || title,
      description: metaDescription || excerpt,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      handle: primaryAuthor.twitter,
      site: primaryAuthor.twitter,
    },
  };

  const tags = originalTags
    .filter((t) => !equalsIgnoreCase(t.name, primaryTag.name))
    .map((tag) => tag.name);
  return {
    excerpt,
    href,
    primaryTag,
    publishedAt,
    slug,
    tags,
    seo,
    title,
    primaryAuthor,
    ...other,
  };
}

async function cachePosts(posts) {
  const cacheFile = join(cacheDir, "posts.json");
  const data = {
    date: new Date().toISOString(),
    posts,
  };
  await fs.writeFile(cacheFile, JSON.stringify(data));
}

async function getCachedPosts() {
  try {
    const cacheFile = join(cacheDir, "posts.json");
    const data = await fs.readFile(cacheFile, "utf8");
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
  const api = initializeContentAPI();
  const posts = await api.posts.browse({
    include: "authors,tags",
    limit: "all",
  });
  const allPosts = posts.map(transformPost);
  // Cache the posts
  await cachePosts(allPosts);
  return allPosts;
}

export async function getPost(slug) {
  const allPost = await getAllPosts();
  return allPost.find((p) => p.slug === slug);
}
