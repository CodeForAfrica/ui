import { getPosts, formatTags } from "@/codeforafrica/lib/data/utils/posts";

async function opportunities(block, api, context) {
  const { query } = context;
  const { labels } = block;

  const options = {
    ...query,
  };

  const { posts, pagination } = await getPosts(api, options, "opportunities");

  const { docs: allOpportunities } = await api.getCollection("posts", {
    limit: 0,
    where: {
      "tags.name": {
        like: "opportunities",
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
    slug: "opportunities",
  };
}

export default opportunities;
