import { getAllPosts, getPost } from "@/codeforafrica/lib/api.ghost/posts";

export async function getAllOpportunities() {
  const allPosts = await getAllPosts();
  const opportunities = allPosts.filter(
    (post) => post.primaryTag.name.toLowerCase() === "opportunities"
  );
  return opportunities;
}

export async function getAllOpportunitiesTags() {
  const opportunities = await getAllOpportunities();
  const tags = opportunities.flatMap((post) => post.tags);
  const uniqueTags = [...new Set(tags.map((tag) => tag.name))];
  uniqueTags.unshift("All");
  return uniqueTags;
}

export async function getOpportnity(slug) {
  const post = await getPost(slug);
  return post;
}

export async function getAllStories() {
  const allPosts = await getAllPosts();
  const stories = allPosts.filter(
    (post) => post.primaryTag?.name.toLowerCase() === "stories"
  );
  return stories;
}

export async function getAllStoriesTags() {
  const stories = await getAllStories();
  const tags = stories.flatMap((post) => post.tags);
  const uniqueTags = [...new Set(tags.map((tag) => tag.name))];
  uniqueTags.unshift("All");
  return uniqueTags;
}

export async function getStory(slug) {
  let story = await getPost(slug);
  // remove tags from post
  // NOTE: For some reason, the single page breaks if the tags are included
  story = { ...story, tags: [] };

  return story;
}
