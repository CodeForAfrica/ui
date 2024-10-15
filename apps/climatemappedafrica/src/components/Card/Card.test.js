import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Card from ".";

import theme from "@/climatemappedafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<Card />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Card {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
