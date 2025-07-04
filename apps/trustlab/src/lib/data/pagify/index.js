import post from "./post";

const COLLECTION_BY_SLUG = {
  opportunities: post,
  incubator: post,
  helplines: post,
  resources: post,
  events: post,
};

async function pagify(parentPage, api, context) {
  const { slug: collection } = parentPage;
  const pagifyCollection = COLLECTION_BY_SLUG[collection];
  return pagifyCollection?.(api, context, parentPage) ?? null;
}

export default pagify;
