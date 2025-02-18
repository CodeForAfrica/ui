import { createRender } from "@commons-ui/testing-library";
import React from "react";

import TeamMembers from "./TeamMembers";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Team",
};

describe("<TeamMembers />", () => {
  it("renders unchanged", () => {
    const { container } = render(<TeamMembers {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
