import { createRender } from "@commons-ui/testing-library";
import React from "react";

import SocialMediaButton from "./SocialMediaButton";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  name: "facebook",
  url: "https://www.facebook.com/",
};

describe("<SocialMediaButton />", () => {
  it("renders unchanged", () => {
    const { container } = render(<SocialMediaButton {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
