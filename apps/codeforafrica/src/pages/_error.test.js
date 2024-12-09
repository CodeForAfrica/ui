import { createRender } from "@commons-ui/testing-library";
import React from "react";

import CustomError from "./_error.page";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  blocks: [],
};

describe("/404", () => {
  it("renders unchanged", () => {
    const { container } = render(<CustomError {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
