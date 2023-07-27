import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Logo from "./Logo";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  logo: {
    image: {
      alt: "Charter Africa",
      fill: true,
      src: "/images/charter-logo.svg",
    },
    href: "/",
  },
};

describe("<Logo />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Logo {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
