import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OpportunityHeader from "./OpportunityHeader";

import theme from "@/charterafrica/theme";

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
