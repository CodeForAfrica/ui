import { createRender } from "@commons-ui/testing-library";
import React from "react";

import CallToAction from "./CallToAction";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<CallToAction />", () => {
  it("renders unchanged", () => {
    const { container } = render(<CallToAction {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
