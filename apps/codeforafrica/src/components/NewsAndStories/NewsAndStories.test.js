import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NewsAndStories from "./NewsAndStories";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "News and Stories",
};

describe("<NewsAndStories />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NewsAndStories {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
