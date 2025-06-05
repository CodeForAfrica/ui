import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ShowCase from "./ShowCase";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<ShowCase />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ShowCase {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
