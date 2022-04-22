import React from "react";

import Footer from "./Footer";

import { render } from "@/codeforafrica/utils/test";

const defaultProps = {
  subscription: {
    embedCode: "",
  },
};

describe("<Footer />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Footer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
