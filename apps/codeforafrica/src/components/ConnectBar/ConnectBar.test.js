import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ConnectBar from "./ConnectBar";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<ConnectBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ConnectBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
