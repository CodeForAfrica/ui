import { Api, Page } from "../payload.types";
import processBlockRoboForm from "./processBlockRoboForm";
type PropsifyBlockFunction = (block: any, api: Api) => Promise<any>;

interface PropsifyBlockBySlug {
  [key: string]: PropsifyBlockFunction;
}

const propsifyBlockBySlug: PropsifyBlockBySlug = {
  "robo-form": processBlockRoboForm,
};
export const blockify = async (blocks: Page["blocks"], api: Api) => {
  const promises = blocks?.map(async (block) => {
    const slug = block.blockType ?? "";
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
