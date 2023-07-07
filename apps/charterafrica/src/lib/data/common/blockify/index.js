import articles from "./articles";
import longform from "./longform";
import ourExplainers from "./ourExplainers";
import ourGrantees from "./ourGrantees";
import post from "./post";

import {
  LONGFORM,
  NEWS,
  OUR_EXPLAINERS,
  OUR_GRANTEES,
  POST,
} from "@/charterafrica/utils/pageBlocks";

const BLOCKIFY_BY_SLUG = {
  [LONGFORM]: longform,
  [NEWS]: articles,
  [OUR_EXPLAINERS]: ourExplainers,
  [OUR_GRANTEES]: ourGrantees,
  [POST]: post,
};

async function blockifyPage(page, api, context) {
  const { blocks } = page;
  const promises = blocks.map(async (block) => {
    const blockify = BLOCKIFY_BY_SLUG[block.slug];
    if (typeof blockify === "function") {
      return blockify(block, page, api, context);
    }
    return { block };
  });
  const items = await Promise.all(promises);
  return items.reduce(
    (acc, curr) => {
      const { block, fallback } = curr;
      acc.blocks.push(block);
      if (fallback) {
        // fallback should all have different keys hence no need for deep merge
        acc.fallback = { ...acc.fallback, ...fallback };
      }
      return acc;
    },
    { blocks: [] }
  );
}

export default blockifyPage;
