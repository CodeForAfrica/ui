import { createRender } from "@commons-ui/testing-library";
import React from "react";

import CustomError from "./_error.page";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  sections: [],
};

describe("/404", () => {
  it("renders unchanged", () => {
    const { container } = render(<CustomError {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
