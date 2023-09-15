import { actionFromActionButton } from "@/codeforafrica/lib/data/utils";

function getInTouch(block) {
  const { actionButton, ...other } = block;

  const action = actionFromActionButton({ ...actionButton });

  return {
    ...other,
    action,
    slug: "get-in-touch",
  };
}

export default getInTouch;
