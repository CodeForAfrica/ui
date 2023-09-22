import formatDate from "@/codeforafrica/utils/formatDate";

function formatStory(story) {
  const {
    title,
    coverImage: { src, alt },
    excerpt,
    slug,
    publishedOn,
  } = story;
  if (!title) {
    return null;
  }
  return {
    title,
    image: {
      src,
      alt,
    },
    excerpt,
    publishedOn: formatDate(publishedOn, {
      includeTime: false,
      month: "short",
    }),
    href: `/stories/${slug}`,
  };
}

async function stories(block, api) {
  const { featured, title, labels } = block;
  const featuredStory = featured && (formatStory(featured) || null);
  const featuredStorySlug = featuredStory
    ? featuredStory.href.split("/").pop()
    : null;

  const options = {
    limit: 9,
    ...(featuredStorySlug && {
      where: {
        slug: {
          not_equals: featuredStorySlug,
        },
      },
    }),
  };

  const {
    docs: storyList,
    totalPages,
    page,
  } = await api.getCollection("article", options);

  const uniqueTags = new Set(
    storyList
      .reduce((acc, story) => {
        const { tags = [] } = story;
        return [...acc, ...tags.map((tag) => tag.name)];
      }, [])
      .sort(),
  );

  const articles = storyList.map(formatStory);

  return {
    title,
    labels,
    tags: Array.from(uniqueTags),
    featured: featuredStory || null,
    articles,
    pagination: {
      count: totalPages,
      page,
    },
    slug: "articles",
  };
}

export default stories;
