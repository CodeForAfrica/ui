import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticlePage from "./ArticlePage";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  coverImage: { src: "/images/stories-1.png" },
  authors: [],
  featureImage: "/images/stories-1.png",
};

describe("<ArticlePage />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticlePage {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
