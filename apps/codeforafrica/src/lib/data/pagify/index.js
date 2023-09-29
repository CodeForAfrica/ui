import members from "./members";
import partners from "./partners";
import post from "./post";
import projects from "./projects";

const COLLECTION_BY_SLUG = {
  partners,
  projects,
  members,
  opportunities: post,
  stories: post,
};

async function pagify(parentPage, api, context) {
  const { slug: collection } = parentPage;
  const pageProps = COLLECTION_BY_SLUG[collection];
  return pageProps?.(api, context) ?? null;
}

export default pagify;
