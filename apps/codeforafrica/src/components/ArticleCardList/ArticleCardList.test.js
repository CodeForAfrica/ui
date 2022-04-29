import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticleCardList from "./ArticleCardList";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<ArticleCardList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticleCardList />);
    expect(container).toMatchSnapshot();
  });
});
