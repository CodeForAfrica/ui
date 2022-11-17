import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Spotlight from "./Spotlight";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<Spotlight />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Spotlight {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
