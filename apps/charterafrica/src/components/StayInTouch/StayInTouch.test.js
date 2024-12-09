import { createRender } from "@commons-ui/testing-library";
import React from "react";

import StayInTouch from "./StayInTouch";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<StayInTouch />", () => {
  it("renders without breaking", () => {
    const { container } = render(<StayInTouch {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
