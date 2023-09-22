import formatDate from "@/codeforafrica/utils/formatDate";

async function stories(block, api) {
  const { featured = {}, title, search } = block;
  const {
    title: featuredStoryTitle,
    coverImage: featuredStoryCoverImage,
    excerpt: featuredStoryExcerpt,
    slug: featuredStorySlug,
    publishedOn: featuredStoryPublishedOn,
  } = featured;

  const {
    docs: storyList,
    totalPages,
    page,
  } = await api.getCollection("article", {
    where: {
      slug: {
        not_equals: featuredStorySlug,
      },
    },
    limit: 9,
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
    publishedOn: formatDate(featuredStoryPublishedOn, {
      includeTime: false,
      month: "short",
    }),
    href: `/stories/${featuredStorySlug}`,
  };

  return {
    title,
    search,
    tags: Array.from(uniqueTags),
    featured: featuredStory,
    articles: storyList.map((story) => {
      const {
        title: storyTitle,
        coverImage: storyCoverImage,
        excerpt: storyExcerpt,
        slug: storySlug,
        publishedOn: storyPublishedOn,
      } = story;
      return {
        title: storyTitle,
        image: storyCoverImage,
        excerpt: storyExcerpt,
        publishedOn: formatDate(storyPublishedOn, {
          includeTime: false,
          month: "short",
        }),
        href: `/stories/${storySlug}`,
      };
    }),
    pagination: {
      count: totalPages,
      page,
    },
    slug: "articles",
  };
}

export default stories;
