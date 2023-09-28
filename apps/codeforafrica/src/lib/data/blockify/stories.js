import {
  getPosts,
  formatPost,
  getTagsByPrimaryTag,
} from "@/codeforafrica/lib/data/utils/posts";

async function stories(block, api, context) {
  const primaryTag = "stories";
  const { query } = context;
  const { featured, title, labels } = block;

  const featuredStory = featured && (formatPost(featured, primaryTag) || null);
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

  const { posts: articles, pagination } = await getPosts(
    api,
    options,
    primaryTag,
  );

  const tags = await getTagsByPrimaryTag(api, primaryTag);

  return {
    title,
    labels,
    tags,
    featured: featuredStory || null,
    articles,
    pagination,
    primaryTag: {
      name: primaryTag,
      slug: primaryTag,
    },
    slug: "articles",
  };
}

export default stories;
