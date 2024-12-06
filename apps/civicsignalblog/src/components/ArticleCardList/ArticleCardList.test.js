import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticleCardList from "./ArticleCardList";

import theme from "@/civicsignalblog/theme";

const render = createRender({ theme });

describe("<ArticleCardList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticleCardList />);
    expect(container).toMatchSnapshot();
  });
});
