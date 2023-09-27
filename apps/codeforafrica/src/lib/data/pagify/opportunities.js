import { getPost } from "@/codeforafrica/lib/data/utils/posts";

async function opportunities(api, context) {
  const { params } = context;
  const page = params.slugs[1];
  const slug = params.slugs[2];
  return getPost(api, slug, page);
}

export default opportunities;
