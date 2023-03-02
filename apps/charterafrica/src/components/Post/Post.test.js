import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Post from "./Post";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  articles: [],
};

describe("<Post />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Post {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
