import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Hero from "./Hero";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  slides: [],
};

describe("<Hero />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Hero {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
