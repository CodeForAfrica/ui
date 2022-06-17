import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Contact from "./index.page";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  sections: [],
};

describe("<Pages/Contact />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Contact {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
