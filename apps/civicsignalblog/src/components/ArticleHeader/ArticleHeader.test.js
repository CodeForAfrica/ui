import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticleHeader from "./ArticleHeader";

import theme from "@/civicsignalblog/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<ArticleHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticleHeader />);
    expect(container).toMatchSnapshot();
  });
});
