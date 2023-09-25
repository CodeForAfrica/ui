import formatDate from "@/codeforafrica/utils/formatDate";

export function formatStory(story) {
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

export async function getStories(api, params) {
  const { page: queryPage = 1, ...other } = params;
  const options = {
    limit: 9,
    page: queryPage,
    ...other,
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

  const stories = storyList.map(formatStory).filter(Boolean);

  return {
    stories,
    pagination: {
      count: totalPages,
      page,
    },
    tags: [...uniqueTags],
  };
}
