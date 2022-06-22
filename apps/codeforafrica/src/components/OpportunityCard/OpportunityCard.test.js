import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OpportunityCard from "./OpportunityCard";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title:
    "DEPUTY INVESTIGATIVE MANAGER: Support the fight against disinformation and transnational organised crime",
  description:
    "Position in: Africa Do you want to help expose the puppet-masters behind disinformation networks, and expose transnational organised criminals? Code for Africa (CfA) has an immediate vacancy for a full-time Deputy Investigative Manager to join our pan-African forensic...",
};

describe("<OpportunityCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OpportunityCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
