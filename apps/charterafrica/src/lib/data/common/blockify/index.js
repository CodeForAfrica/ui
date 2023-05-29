import longform from "./longform";
import ourExplainers from "./ourExplainers";
import ourGrantees from "./ourGrantees";

import {
  LONGFORM,
  OUR_EXPLAINERS,
  OUR_GRANTEES,
} from "@/charterafrica/utils/pageBlocks";

const BLOCKIFY_BY_SLUG = {
  [LONGFORM]: longform,
  [OUR_EXPLAINERS]: ourExplainers,
  [OUR_GRANTEES]: ourGrantees,
};

async function blockifyPage({ blocks }, api, context) {
  const promises = blocks.map(async (block) => {
    const blockify = BLOCKIFY_BY_SLUG[block.slug];
    if (typeof blockify === "function") {
      return blockify(block, api, context);
    }
    return block;
  });
  return Promise.all(promises);
}

export default blockifyPage;
