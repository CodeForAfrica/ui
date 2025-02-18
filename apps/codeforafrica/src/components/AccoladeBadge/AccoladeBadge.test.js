import { createRender } from "@commons-ui/testing-library";
import React from "react";

import AccoladeBadge from "./AccoladeBadge";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  name: "Award Name",
  date: "Month 2021",
};

describe("<AccoladeBadge />", () => {
  it("renders unchanged", () => {
    const { container } = render(<AccoladeBadge {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
