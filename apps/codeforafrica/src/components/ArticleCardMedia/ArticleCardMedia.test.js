import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticleCardMedia from "./ArticleCardMedia";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

describe("<ArticleCardMedia />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticleCardMedia />);
    expect(container).toMatchSnapshot();
  });
});
