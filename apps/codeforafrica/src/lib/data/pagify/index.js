import members from "./members";
import partners from "./partners";

const COLLECTION_BY_SLUG = {
  partners,
  members,
};

async function pagify(parentPage, api, context) {
  const { slug: collection, meta = {} } = parentPage;
  const pageProps = COLLECTION_BY_SLUG[collection];
  const props = (await pageProps?.(api, context)) ?? null;
  return { ...props, meta };
}

export default pagify;
