import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticleAuthorCopy from ".";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<ArticleAuthorCopy />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticleAuthorCopy />);
    expect(container).toMatchSnapshot();
  });
});
