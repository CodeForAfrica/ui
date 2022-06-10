import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PageHeader from "./PageHeader";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<PageHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PageHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
