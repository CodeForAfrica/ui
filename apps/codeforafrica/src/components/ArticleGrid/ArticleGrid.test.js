import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticleGrid from "./ArticleGrid";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<ArticleGrid />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticleGrid />);
    expect(container).toMatchSnapshot();
  });
});
