/* eslint-disable import/prefer-default-export */

import hero from "./hero";

const propsifyBlockBySlug = {
  "page-hero": hero,
};

export const blockify = async (blocks, api) => {
  const promises = blocks?.map(async (block) => {
    const slug = block.blockType;
    const propsifyBlock = propsifyBlockBySlug[slug];

    if (propsifyBlock) {
      return propsifyBlock(block, api);
    }
    return {
      ...block,
      slug,
    };
  });

  if (promises) {
    return Promise.all(promises);
  }
  return blocks ?? null;
};
