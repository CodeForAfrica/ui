import post from "./post";

const COLLECTION_BY_SLUG = {
  events: post,
  helplines: post,
  incubator: post,
  opportunities: post,
  reports: post,
  resources: post,
};

async function pagify(parentPage, api, context) {
  const { slug: collection } = parentPage;
  const pagifyCollection = COLLECTION_BY_SLUG[collection];
  return pagifyCollection?.(api, context, parentPage) ?? null;
}

export default pagify;
