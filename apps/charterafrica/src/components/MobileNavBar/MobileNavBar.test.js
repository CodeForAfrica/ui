import { createRender } from "@commons-ui/testing-library";
import React from "react";

import MobileNavBar from "./MobileNavBar";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  logo: {
    alt: "Charter Africa",
    src: "/images/charter-logo.svg",
    width: "145",
    height: "40",
  },
};

describe("<MobileNavBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<MobileNavBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
