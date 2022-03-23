import { render } from "@testing-library/react";
import React from "react";

import Button from "./Button";

describe("Button", () => {
  it("renders unchanged", () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
  });
});
