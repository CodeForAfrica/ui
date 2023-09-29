import members from "./members";
import partners from "./partners";
import post from "./post";

const COLLECTION_BY_SLUG = {
  members,
  opportunities: post,
  partners,
  stories: post,
};

async function pagify(parentPage, api, context) {
  const { slug: collection } = parentPage;
  const pageProps = COLLECTION_BY_SLUG[collection];
  return pageProps?.(api, context) ?? null;
}

export default pagify;
