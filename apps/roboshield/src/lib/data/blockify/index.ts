import { Api } from "../../payload";

type PropsifyBlockFunction = (block: any, api: Api) => Promise<any>;

interface PropsifyBlockBySlug {
  [key: string]: PropsifyBlockFunction;
}

const content: PropsifyBlockFunction = async (block: any) => {
  return {
    ...block,
    slug: "content",
  };
};

const propsifyBlockBySlug: PropsifyBlockBySlug = {
  content: content,
};
export const blockify = async (blocks: any, api: Api) => {
  const promises = blocks?.map(async (block: any) => {
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
