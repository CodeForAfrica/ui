import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OpportunityCardHeader from "./OpportunityCardHeader";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  onClick: () => {},
  title: "Grants",
  sx: {},
  showAll: false,
  showAllText: "Show all",
  showLessText: "Show less",
};

describe("<OpportunityCardHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OpportunityCardHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
