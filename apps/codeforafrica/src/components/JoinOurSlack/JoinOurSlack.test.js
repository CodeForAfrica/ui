import { createRender } from "@commons-ui/testing-library";
import React from "react";

import JoinOurSlack from "./JoinOurSlack";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<JoinOurSlack />", () => {
  it("renders unchanged", () => {
    const { container } = render(<JoinOurSlack {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
