import React from "react";

import Page from "./Page";

import theme from "@/codeforafrica/theme";
import { render } from "@/codeforafrica/utils/test";

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
