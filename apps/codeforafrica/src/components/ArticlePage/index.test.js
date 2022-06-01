import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticlePage from ".";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<ArticlePage />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticlePage />);
    expect(container).toMatchSnapshot();
  });
});
