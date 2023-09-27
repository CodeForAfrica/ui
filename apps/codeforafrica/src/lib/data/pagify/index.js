import members from "./members";
import partners from "./partners";

const COLLECTION_BY_SLUG = {
  partners,
  members,
};

async function pagify(parentPage, api, context) {
  const { slug: collection } = parentPage;
  const pageProps = COLLECTION_BY_SLUG[collection];
  return pageProps?.(api, context) ?? null;
}

export default pagify;
