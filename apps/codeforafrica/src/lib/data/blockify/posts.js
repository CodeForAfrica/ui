import {
  getPosts,
  formatPost,
  getTagsByPrimaryTag,
} from "@/codeforafrica/lib/data/utils/posts";

async function posts(block, api, context) {
  const { primaryTag, labels, stories = {} } = block;
  const { query } = context;
  const { featured: featuredStory, title } = stories;
  const featured = featuredStory ? formatPost(featuredStory, primaryTag) : null;
  const options = {
    ...query,
  };
  // rename post to fix eslint no-shadow
  const { posts: list, pagination } = await getPosts(api, options, primaryTag);
  const tags = await getTagsByPrimaryTag(api, primaryTag);
  return {
    title,
    labels,
    tags,
    featured,
    posts: list,
    pagination,
    primaryTag,
    slug: primaryTag,
  };
}

export default posts;
