import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Projects from "./Projects";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  pagination: {},
  results: [],
};

describe("<Projects />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Projects {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
