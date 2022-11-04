import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Layout from "./Layout";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  footer: {},
};

describe("<Layout />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Layout {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
