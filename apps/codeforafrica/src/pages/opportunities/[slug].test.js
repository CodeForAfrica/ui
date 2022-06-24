import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OpportunityPage from "./[slug].page";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  sections: [],
};

describe("<Pages/Opportunites/[Slug] />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OpportunityPage {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
