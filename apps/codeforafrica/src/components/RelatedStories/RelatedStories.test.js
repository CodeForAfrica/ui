import { createRender } from "@commons-ui/testing-library";
import React from "react";

import RelatedStories from "./RelatedStories";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Related Stories",
};

describe("<RelatedStories />", () => {
  it("renders unchanged", () => {
    const { container } = render(<RelatedStories {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
