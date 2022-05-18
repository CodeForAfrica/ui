import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Title from "./Title";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<Title />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Title {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
