import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ShareBarButton from "./ShareBarButton";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  tooltipProps: { title: "Title" },
};

describe("<ShareBarButton />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ShareBarButton {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
