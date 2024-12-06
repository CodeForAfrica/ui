import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Switch from "./Switch";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<Switch />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Switch {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
