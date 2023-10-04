import { formatPost } from "@/codeforafrica/lib/data/utils/posts";

async function postsOverview(block) {
  const {
    primaryTag,
    featured: { story: featuredStory, action: featuredStoryActionLabel },
    stories: { items, action },
    ...other
  } = block;
  return {
    ...other,
    action,
    featured: formatPost(featuredStory, primaryTag),
    featuredStoryActionLabel,
    stories: items.map((item) => formatPost(item, primaryTag)),
    slug: "posts-overview",
  };
}

export default postsOverview;
