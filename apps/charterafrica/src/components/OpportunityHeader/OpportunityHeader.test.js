import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OpportunityHeader from "./OpportunityHeader";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Grants and Fellowships",
};

describe("<OpportunityHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OpportunityHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
