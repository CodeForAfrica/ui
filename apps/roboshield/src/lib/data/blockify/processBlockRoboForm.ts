import { Page } from "@/root/payload-types";
import { Api } from "@/roboshield/lib/payload";
import { ExtractBlockType } from "@/roboshield/utils/blocks";

type PropsifyBlockFunction<T> = (
  block: T,
  api: Api,
) => Promise<T & { slug: string }>;

function sortSteps(steps: any[]) {
  const stepOrder: string[] = [
    "existing-robots",
    "delays",
    "paths",
    "block-bots",
    "site-maps",
    "finish",
  ];
  return stepOrder.map((slug) =>
    steps.find(({ blockType }) => blockType === slug),
  );
}

const processBlockRoboForm: PropsifyBlockFunction<
  ExtractBlockType<NonNullable<Page["blocks"]>[number], "robo-form">
> = async (block, api) => {
  const steps = sortSteps(block.steps ?? []);

  return {
    ...block,
    slug: "robo-form",
    steps,
  };
};

export default processBlockRoboForm;
