import {
  getPosts,
  getTagsByPrimaryTag,
} from "@/codeforafrica/lib/data/utils/posts";

async function opportunities(block, api, context) {
  const primaryTag = "opportunities";
  const { query } = context;
  const { labels } = block;

  const options = {
    ...query,
  };

  const { posts, pagination } = await getPosts(api, options, primaryTag);

  const tags = await getTagsByPrimaryTag(api, primaryTag);

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
