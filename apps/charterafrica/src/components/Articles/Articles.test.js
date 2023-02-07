import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Articles from "./Articles";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  articles: [],
};

describe("<Articles />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Articles {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
