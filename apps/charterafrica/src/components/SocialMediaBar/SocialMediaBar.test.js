import { createRender } from "@commons-ui/testing-library";
import React from "react";

import SocialMediaBar from "./SocialMediaBar";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Connect with: ",
};

describe("<SocialMediaBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<SocialMediaBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
