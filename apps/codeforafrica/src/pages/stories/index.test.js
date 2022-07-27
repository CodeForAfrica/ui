import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Index from "./index.page";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  sections: [],
};

describe("<Pages/Stories />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Index {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
