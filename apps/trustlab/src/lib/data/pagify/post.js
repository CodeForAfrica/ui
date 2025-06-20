import { getPost } from "@/trustlab/utils/post";

async function post(api, context) {
  const { params } = context;
  const slug = params.slugs[1];
  return getPost(api, slug);
}

export default post;
