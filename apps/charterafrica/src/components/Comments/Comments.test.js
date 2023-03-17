import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Comments from "./Comments";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  comments: [],
};

describe("<Comments />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Comments {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
