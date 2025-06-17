import post from "./post";

const COLLECTION_BY_SLUG = {
  opportunities: post,
};

async function pagify(parentPage, api, context) {
  const { slug: collection } = parentPage;
  const pageProps = COLLECTION_BY_SLUG[collection];
  return pageProps?.(api, context, parentPage) ?? null;
}

export default pagify;
