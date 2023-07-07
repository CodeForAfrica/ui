import path from "path";

import { deepmerge } from "@mui/utils";

function blockifyPost(item, parentPage) {
  let url = null;
  const { breadcrumbs = [] } = parentPage;
  const parentUrl = breadcrumbs[breadcrumbs.length - 1]?.url;
  if (parentUrl) {
    const { slug } = item;
    url = path.join(parentUrl, slug);
  }

  return {
    ...item,
    blockType: "post",
    content: null,
    slug: "post",
    url,
  };
}

function blockifyContent(item) {
  const content = item.content ?? null;

  return {
    blockType: "longform",
    content,
    id: item.id,
  };
}

async function article(parentPage, api, context) {
  const { params, locale } = context;
  const { slug: collection } = parentPage;
  const slug = params.slugs[2];
  const { docs } = await api.getCollection(collection, {
    locale,
    where: {
      slug: {
        equals: slug,
      },
      _status: { equals: "published" },
    },
  });

  if (!docs?.length) {
    return null;
  }
  const [item] = docs;
  const post = blockifyPost(item, parentPage);
  const content = blockifyContent(item);
  return {
    ...parentPage,
    ...item,
    blocks: [post, content],
    breadcrumbs: [
      ...parentPage.breadcrumbs,
      {
        url: post.url,
        label: post.title,
        id: post.id,
      },
    ],
    fullTitle: `${parentPage.fullTitle} > ${item.title}`,
    meta: deepmerge(parentPage.meta, item.meta),
    title: `${item.title} | ${parentPage.title}`,
    url: post.url,
  };
}

export default article;
