import { createRender } from "@commons-ui/testing-library";
import React from "react";

import MobileNavBar from "./MobileNavBar";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<MobileNavBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<MobileNavBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
