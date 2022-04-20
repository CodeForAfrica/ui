import { render } from "@testing-library/react";
import React from "react";

import Footer from "./Footer";

const footerProps = {
  subscription: {
    embedCode: "",
  },
};

describe("<Footer />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Footer {...footerProps} />);
    expect(container).toMatchSnapshot();
  });
});
