import member from "./member";
import partner from "./partner";
import post from "./post";
import project from "./project";

const COLLECTION_BY_SLUG = {
  members: member,
  opportunities: post,
  partners: partner,
  projects: project,
  stories: post,
};

async function pagify(parentPage, api, context) {
  const { slug: collection } = parentPage;
  const pageProps = COLLECTION_BY_SLUG[collection];
  return pageProps?.(api, context) ?? null;
}

export default pagify;
