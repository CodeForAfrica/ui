import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NavBar from ".";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  logo: {
    alt: "Charter Africa",
    src: "/images/charter-logo.svg",
    width: "145",
    height: "40",
  },
};

describe("<NavBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NavBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
