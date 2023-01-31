import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PageSummary from "./PageSummary";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  summary: [{ children: [{ text: "Page Summary Title" }] }],
};

describe("<PageSummary />", () => {
  it("renders without breaking", () => {
    const { container } = render(<PageSummary {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
