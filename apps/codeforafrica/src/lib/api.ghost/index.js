import { getAllPosts, getPost } from "@/codeforafrica/lib/api.ghost/posts";

export async function getAllOpportunities() {
  const allPosts = await getAllPosts();
  const opportunities = allPosts.filter(
    (post) => post.primaryTag.name.toLowerCase() === "opportunities"
  );
  return opportunities;
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

export async function getStory(slug) {
  return getPost(slug);
}
