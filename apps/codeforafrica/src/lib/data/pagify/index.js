import members from "./members";
import opportunity from "./opportunity";
import partners from "./partners";
import story from "./story";

const COLLECTION_BY_SLUG = {
  members,
  opportunities: opportunity,
  partners,
  stories: story,
};

async function pagify(parentPage, api, context) {
  const { slug: collection } = parentPage;
  const pageProps = COLLECTION_BY_SLUG[collection];
  return pageProps?.(api, context) ?? null;
}

export default pagify;
