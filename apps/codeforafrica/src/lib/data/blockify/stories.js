import {
  getStories,
  formatStory,
} from "@/codeforafrica/lib/data/utils/stories";

async function stories(block, api, context) {
  const { query } = context;
  const { featured, title, labels } = block;
  const featuredStory = featured && (formatStory(featured) || null);
  const featuredStorySlug = featuredStory
    ? featuredStory.href.split("/").pop()
    : null;

  const options = {
    ...(featuredStorySlug && {
      where: {
        slug: {
          not_equals: featuredStorySlug,
        },
      },
    }),
    ...query,
  };

  const {
    stories: articles,
    pagination,
    tags,
  } = await getStories(api, options);

  return {
    title,
    labels,
    tags,
    featured: featuredStory || null,
    articles,
    pagination,
    slug: "articles",
  };
}

export default stories;
