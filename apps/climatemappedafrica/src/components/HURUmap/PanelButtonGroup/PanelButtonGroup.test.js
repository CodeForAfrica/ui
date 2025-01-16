import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PanelButtonGroup from ".";

import theme from "@/climatemappedafrica/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<PanelButtonGroup />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PanelButtonGroup {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
