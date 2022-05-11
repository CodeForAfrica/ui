import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ShareBar from "./ShareBar";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<ShareBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ShareBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
