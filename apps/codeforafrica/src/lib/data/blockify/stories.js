import {
  getStories,
  formatStory,
} from "@/codeforafrica/lib/data/utils/stories";

function formatTags(tags) {
  const tagCounts = tags.reduce((counts, tag) => {
    // eslint-disable-next-line no-param-reassign
    counts[tag] = (counts[tag] || 0) + 1;
    return counts;
  }, {});
  const sortedTags = Object.keys(tagCounts).sort((a, b) => {
    return tagCounts[b] - tagCounts[a];
  });
  const excludedTags = ["stories", "opportunities"];
  const filteredTags = sortedTags.filter((tag) => {
    return !excludedTags.includes(tag.toLowerCase());
  });
  return filteredTags;
}

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

  const { stories: articles, pagination } = await getStories(api, options);

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
    return [...acc, ...tags.map((tag) => tag.name)];
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
