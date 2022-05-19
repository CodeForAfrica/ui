import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticleContent from ".";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<ArticleContent />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticleContent />);
    expect(container).toMatchSnapshot();
  });
});
