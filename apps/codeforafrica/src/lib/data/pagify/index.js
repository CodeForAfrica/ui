import partners from "./partners";
import stories from "./stories";

const COLLECTION_BY_SLUG = {
  partners,
  stories,
};

async function pagify(parentPage, api, context) {
  const { slug: collection } = parentPage;
  const pageProps = COLLECTION_BY_SLUG[collection];
  return pageProps?.(api, context) ?? null;
}

export default pagify;
