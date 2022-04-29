import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticleCardContent from "./ArticleCardContent";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<ArticleCardContent />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticleCardContent />);
    expect(container).toMatchSnapshot();
  });
});
