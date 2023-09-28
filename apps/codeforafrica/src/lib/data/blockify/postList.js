import {
  getPosts,
  formatPost,
  getTagsByPrimaryTag,
} from "@/codeforafrica/lib/data/utils/posts";

async function postList(block, api, context) {
  const { primaryTag, labels, stories = {} } = block;
  const { query } = context;
  const { featured, title } = stories;
  const featuredStory = featured && (formatPost(featured, primaryTag) || null);
  const options = {
    ...query,
  };
  const { posts, pagination } = await getPosts(api, options, primaryTag);
  const tags = await getTagsByPrimaryTag(api, primaryTag);
  return {
    title,
    labels,
    tags,
    featured: featuredStory || null,
    posts,
    pagination,
    primaryTag,
    slug: primaryTag,
  };
}

export default postList;
