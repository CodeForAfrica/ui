import { render } from "@commons-ui/testing-library";
import React from "react";

import Card from ".";

const defaultProps = {};

describe("<Card />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Card {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
