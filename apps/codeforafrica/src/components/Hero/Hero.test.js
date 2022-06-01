import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Hero from "./Hero";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  image: { src: "/" },
  title: 'Empowering <span class="highlight">Africa</span> with',
  message: "civic technologies",
};

describe("<Hero />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Hero {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
