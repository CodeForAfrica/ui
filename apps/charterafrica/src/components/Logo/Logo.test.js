import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Logo from "./Logo";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  logo: {
    alt: "Charter Africa",
    src: "/images/charter-logo.svg",
    width: "145",
    height: "40",
    href: "/",
    priority: true,
  },
};

describe("<Logo />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Logo {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
