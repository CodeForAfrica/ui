import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OpportunityCardListHeader from "./OpportunityCardListHeader";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  onClick: () => {},
  title: "Grants",
  sx: {},
  showAll: false,
  showAllText: "Show all",
  showLessText: "Show less",
};

describe("<OpportunityCardListHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <OpportunityCardListHeader {...defaultProps} />
    );
    expect(container).toMatchSnapshot();
  });
});
