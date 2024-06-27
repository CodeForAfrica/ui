import { AppContext } from "next/app";
import { Api, Page } from "../payload.types";

async function processPageIndex(
  page: Page,
  api: Api,
  context: AppContext["ctx"],
) {
  const blockIndex = page.blocks.findIndex(
    (block) => block.blockType === "robo-form",
  );
  const roboFormBlockIndex = blockIndex > -1 ? blockIndex : page.blocks.length;
  const block = page.blocks[roboFormBlockIndex];
  const steps = [
    block.existingRobots,
    block.delays,
    block.paths,
    block.blockBots,
    block.siteMaps,
    block.finish,
  ];
  page.blocks[roboFormBlockIndex] = {
    ...block,
    slug: "robo-form",
    steps,
  };

  return page;
}

export default processPageIndex;
