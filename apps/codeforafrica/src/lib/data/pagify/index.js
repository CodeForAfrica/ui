import members from "./member";
import partners from "./partner";
import post from "./post";
import projects from "./project";

const COLLECTION_BY_SLUG = {
  members,
  opportunities: post,
  partners,
  projects,
  stories: post,
};

async function pagify(parentPage, api, context) {
  const { slug: collection } = parentPage;
  const pageProps = COLLECTION_BY_SLUG[collection];
  return pageProps?.(api, context) ?? null;
}

export default pagify;
