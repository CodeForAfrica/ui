import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticlesFilter from "./ArticlesFilter";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  categories: ["Category 1", "Category 2"],
  tags: ["Tag 1", "Tag 2"],
};

describe("<ArticlesFilter />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticlesFilter {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
