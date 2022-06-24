import { createRender } from "@commons-ui/testing-library";
import React from "react";

import HeroText from "./HeroText";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: 'Empowering <span class="highlight">Africa</span> with',
  message: "civic technologies",
};

describe("<HeroText />", () => {
  it("renders unchanged", () => {
    const { container } = render(<HeroText {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
