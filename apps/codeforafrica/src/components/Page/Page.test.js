import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Page from "./Page";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  theme,
  sections: {},
};

describe("<Page />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Page {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
