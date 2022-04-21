import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import React from "react";

import Index from ".";

import theme from "@/codeforafrica/theme";

const defaultProps = {
  theme,
  sections: {},
};

describe("Homepage", () => {
  it("renders unchanged", () => {
    const { container } = render(<Index {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
