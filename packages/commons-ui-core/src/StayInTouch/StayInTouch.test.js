import { render } from "@testing-library/react";
import React from "react";

import StayInTouch from ".";

describe("A", () => {
  it("renders unchanged", () => {
    const { container } = render(<StayInTouch />);
    expect(container).toMatchSnapshot();
  });
});
