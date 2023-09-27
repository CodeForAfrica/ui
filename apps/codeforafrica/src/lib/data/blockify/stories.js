import {
  getPosts,
  formatPost,
  formatTags,
} from "@/codeforafrica/lib/data/utils/posts";

async function stories(block, api, context) {
  const { query } = context;
  const { featured, title, labels } = block;

  const featuredStory = featured && (formatPost(featured, "stories") || null);
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

  const { posts: articles, pagination } = await getPosts(
    api,
    options,
    "stories",
  );

  const { docs: allStories } = await api.getCollection("posts", {
    limit: 0,
    where: {
      "tags.name": {
        like: "stories",
      },
    },
  });

  const allTags = allStories.reduce((acc, story) => {
    const { tags = [] } = story;
    return [...acc, ...tags.map(({ name, slug }) => ({ name, slug }))];
  }, []);

  const tags = formatTags(allTags);

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
