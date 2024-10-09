/* eslint-disable import/prefer-default-export */

import { blockify } from "@/climatemappedafrica/lib/data/blockify";

export async function getPageProps(api, context) {
  // For now, ClimatemappedAfrica only supports single paths i.e. /, /about, etc.,
  // so params.slug[0] is good enough
  const slugs = context.params?.slug || undefined;
  const [slug] = slugs || ["index"];
  const { draftMode = false } = context;
  const options = { draft: draftMode };

  const {
    docs: [page],
  } = await api.findPage(slug, options);

  if (!page) {
    return null;
  }

  const blocks = await blockify(page.blocks, api);

  return {
    blocks,
    siteSettings: {},
  };
}
