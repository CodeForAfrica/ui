import { getPost } from "@/codeforafrica/lib/data/utils/posts";

async function story(api, context) {
  const { params } = context;
  const page = params.slugs[1];
  const slug = params.slugs[2];
  const post = await getPost(api, slug, page);
  if (!post) return null;
  return {
    ...post,
    // TODO: get recent posts
    recent: [],
  };
}

export default story;
