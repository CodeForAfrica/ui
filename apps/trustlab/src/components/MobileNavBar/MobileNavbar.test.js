import { createRender } from "@commons-ui/testing-library";
import React from "react";

import MobileNavBar from "./MobileNavBar";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {};

// NextImageButton bails out when there is no src, so a logo is required for the
// image to render at all.
const logo = { src: "/test-logo.png", alt: "TrustLab" };

describe("<MobileNavBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<MobileNavBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("scales the logo by width so its aspect ratio is preserved", () => {
    const { getByRole } = render(
      <MobileNavBar {...defaultProps} logo={logo} />,
    );

    expect(getByRole("img", { name: "Logo" })).toHaveStyle({
      width: "100%",
      height: "auto",
      "max-height": "61px",
    });
  });
});
