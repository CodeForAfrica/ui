import { createRender } from "@commons-ui/testing-library";
import React from "react";

import TeamMembers from "./TeamMembers";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Team",
  team: [],
};

describe("<TeamMembers />", () => {
  it("renders unchanged", () => {
    const { container } = render(<TeamMembers {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
