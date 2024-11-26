import { createRender } from "@commons-ui/testing-library";
import React from "react";

import BackgroundBox from "./BackgroundBox";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<BackgroundBox/>", () => {
  it("renders unchanged", () => {
    const { container } = render(<BackgroundBox {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
