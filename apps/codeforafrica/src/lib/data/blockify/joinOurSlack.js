import { actionFromActionButton } from "@/codeforafrica/lib/data/utils";

function joinOurSlack(block) {
  const { actionButton, ...other } = block;
  const action = actionFromActionButton({ ...actionButton });

  return {
    ...other,
    action,
    slug: "join-our-slack",
  };
}

export default joinOurSlack;
