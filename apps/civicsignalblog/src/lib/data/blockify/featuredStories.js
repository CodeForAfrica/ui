import { formatPost } from "@/civicsignalblog/lib/data/utils/posts";

async function featuredStories(block) {
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
    slug: "featured-stories",
  };
}

export default featuredStories;
