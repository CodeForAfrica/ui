import { getPosts, formatTags } from "@/codeforafrica/lib/data/utils/posts";

async function opportunities(block, api, context) {
  const primaryTag = "opportunities";
  const { query } = context;
  const { labels } = block;

  const options = {
    ...query,
  };

  const { posts, pagination } = await getPosts(api, options, primaryTag);

  const { docs: allOpportunities } = await api.getCollection("posts", {
    limit: 0,
    where: {
      "tags.name": {
        like: primaryTag,
      },
    },
  });

  const allTags = allOpportunities.reduce((acc, story) => {
    const { tags = [] } = story;
    return [...acc, ...tags.map(({ name, slug }) => ({ name, slug }))];
  }, []);

  const tags = formatTags(allTags);

  return {
    labels,
    tags,
    opportunities: posts,
    pagination,
    primaryTag: {
      name: primaryTag,
      slug: primaryTag,
    },
    slug: "opportunities",
  };
}

export default opportunities;
