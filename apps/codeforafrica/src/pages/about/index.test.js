import { createRender } from "@commons-ui/testing-library";
import React from "react";

import About from "./index.page";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  sections: [],
};

describe("/about", () => {
  it("renders unchanged", () => {
    const { container } = render(<About {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
