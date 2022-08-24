import { getAllPosts, getPost } from "@/codeforafrica/lib/api.ghost/posts";
import getSettings from "@/codeforafrica/lib/api.ghost/settings";
import equalsIgnoreCase from "@/codeforafrica/utils/equalsIgnoreCase";

export async function getAllOpportunities() {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) =>
    equalsIgnoreCase(post.primaryTag.name, "opportunities")
  );
}

export async function getAllOpportunitiesTags() {
  const opportunities = await getAllOpportunities();
  const tags = opportunities.flatMap((post) => post.tags);
  return ["All", ...new Set(tags)];
}

export async function getOpportnity(slug) {
  return getPost(slug);
}

export async function getAllStories() {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) =>
    equalsIgnoreCase(post.primaryTag.name, "stories")
  );
}

export async function getAllStoriesTags() {
  const stories = await getAllStories();
  const tags = stories.flatMap((post) => post.tags);
  return ["All", ...new Set(tags)];
}

export async function getStory(slug) {
  return getPost(slug);
}

export async function getRelatedStoriesByTags(tags, story = {}) {
  const stories = await getAllStories();
  return stories.filter(
    (s) =>
      s.id !== story.id &&
      s.tags.some((t) => tags.find((st) => equalsIgnoreCase(t, st)))
  );
}

export async function getSiteSettings() {
  return getSettings();
}
