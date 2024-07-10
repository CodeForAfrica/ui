import { Page } from "@/root/payload-types";
import { ExtractBlockType } from "@/roboshield/utils/blocks";
import { Api } from "@/roboshield/lib/payload";

type PropsifyBlockFunction<T> = (
  block: T,
  api: Api,
) => Promise<T & { slug: string }>;

type PropsifyBlockBySlug = {
  [K in NonNullable<
    Page["blocks"]
  >[number]["blockType"]]?: PropsifyBlockFunction<
    ExtractBlockType<NonNullable<Page["blocks"]>[number], K>
  >;
};

type BlockType = ExtractBlockType<
  NonNullable<Page["blocks"]>[number],
  "page-header"
>;
const pageHeader: PropsifyBlockFunction<BlockType> = async (block, api) => {
  // some block specific computation, i.e using api
  return {
    ...block,
    slug: "page-header",
  };
};

const propsifyBlockBySlug: PropsifyBlockBySlug = {
  "page-header": pageHeader,
};

export const blockify = async (blocks: Page["blocks"], api: Api) => {
  const promises = blocks?.map(async (block) => {
    const slug = block.blockType as NonNullable<
      Page["blocks"]
    >[number]["blockType"];
    const propsifyBlock = propsifyBlockBySlug[slug] as any;

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
