import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticleGrid from "./ArticleGrid";

import theme from "@/civicsignalblog/theme";

const render = createRender({ theme });

describe("<ArticleGrid />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticleGrid />);
    expect(container).toMatchSnapshot();
  });
});
