import { Api } from "../payload.types";

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

async function processBlockRoboForm(block: any, api: Api) {
  const steps = sortSteps(block.steps ?? []);

  return {
    ...block,
    slug: "robo-form",
    steps,
  };
}

export default processBlockRoboForm;
