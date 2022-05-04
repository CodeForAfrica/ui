import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticleCardMedia from "./ArticleCardMedia";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<ArticleCardMedia />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticleCardMedia />);
    expect(container).toMatchSnapshot();
  });
});
