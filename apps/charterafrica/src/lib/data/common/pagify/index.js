import article from "./article";

const COLLECTION_BY_SLUG = {
  news: article,
};

async function pagify(parentPage, api, context) {
  const { slug: collection } = parentPage;
  return COLLECTION_BY_SLUG[collection]?.(parentPage, api, context) ?? null;
}

export default pagify;
