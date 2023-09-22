async function stories(block, api) {
  const { featured = {}, title, search } = block;
  const {
    title: featuredStoryTitle,
    coverImage: featuredStoryCoverImage,
    excerpt: featuredStoryExcerpt,
    slug: featuredStorySlug,
  } = featured;

  const { docs: storyList } = await api.getCollection("story", {
    where: {
      slug: {
        not_equals: featuredStorySlug,
      },
    },
  });

  const uniqueTags = new Set(
    storyList
      .reduce((acc, story) => {
        const { tags = [] } = story;
        return [...acc, ...tags.map((tag) => tag.name)];
      }, [])
      .sort(),
  );

  const featuredStory = {
    title: featuredStoryTitle,
    image: featuredStoryCoverImage,
    excerpt: featuredStoryExcerpt,
    slug: featuredStorySlug,
  };

  return {
    title,
    search,
    tags: Array.from(uniqueTags),
    featured: featuredStory,
    list: storyList.map((story) => {
      const {
        title: storyTitle,
        coverImage: storyCoverImage,
        excerpt: storyExcerpt,
        slug: storySlug,
      } = story;
      return {
        title: storyTitle,
        image: storyCoverImage,
        excerpt: storyExcerpt,
        slug: storySlug,
      };
    }),
    slug: "stories",
  };
}

export default stories;
