import { createRender } from "@commons-ui/testing-library";
import React from "react";

import TooltipButton from "./TooltipButton";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  tooltipProps: { title: "Title" },
};

describe("<TooltipButton />", () => {
  it("renders unchanged", () => {
    const { container } = render(<TooltipButton {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
