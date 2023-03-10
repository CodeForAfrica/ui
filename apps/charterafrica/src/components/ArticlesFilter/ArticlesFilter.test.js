import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticlesFilter from "./ArticlesFilter";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  sorting: ["Recent", "Oldest"],
};

describe("<ArticlesFilter />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticlesFilter {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
