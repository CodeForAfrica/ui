import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DesktopNavBar from "./DesktopNavBar";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  logo: {
    alt: "Charter Africa",
    src: "/images/charter-logo.svg",
    width: "230",
    height: "60",
  },
};

describe("<DesktopNavBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DesktopNavBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
