import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ShareThisPage from "./ShareThisPage";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<ShareThisPage />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ShareThisPage {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
