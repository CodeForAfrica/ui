import { createRender } from "@commons-ui/testing-library";
import React from "react";

import StayInTouch from "./StayInTouch";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<StayInTouch />", () => {
  it("renders without breaking", () => {
    const { container } = render(<StayInTouch {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
