import helplines from "./helplines";
import post from "./post";
import resources from "./resources";

const COLLECTION_BY_SLUG = {
  opportunities: post,
  incubator: post,
  helplines,
  resources,
};

async function pagify(parentPage, api, context) {
  const { slug: collection } = parentPage;
  const pagifyCollection = COLLECTION_BY_SLUG[collection];
  return pagifyCollection?.(api, context, parentPage) ?? null;
}

export default pagify;
