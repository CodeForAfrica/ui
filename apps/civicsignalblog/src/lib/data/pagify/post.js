import { getPost } from "@/civicsignalblog/lib/data/utils/posts";

async function post(api, context) {
  const { params, draftMode = false } = context;
  const options = { draft: draftMode };
  const page = params.slugs[1];
  const slug = params.slugs[2];
  return getPost(api, slug, page, options);
}

export default post;
