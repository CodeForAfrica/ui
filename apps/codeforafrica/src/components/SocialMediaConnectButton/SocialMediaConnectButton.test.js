import { createRender } from "@commons-ui/testing-library";
import React from "react";

import SocialMediaConnectButton from "./SocialMediaConnectButton";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  type: "facebook",
  url: "https://www.facebook.com/",
};

describe("<SocialMediaConnectButton />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <SocialMediaConnectButton {...defaultProps} />
    );
    expect(container).toMatchSnapshot();
  });
});
