import post from "./post";
import report from "./report";

const COLLECTION_BY_SLUG = {
  events: post,
  helplines: post,
  incubator: post,
  opportunities: post,
  research: report,
  resources: post,
};

async function pagify(parentPage, api, context) {
  const { slug: collection } = parentPage;
  const pagifyCollection = COLLECTION_BY_SLUG[collection];
  return pagifyCollection?.(api, context, parentPage) ?? null;
}

export default pagify;
