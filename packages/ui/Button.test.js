import { render } from "@testing-library/react";
import React from "react";

import Button from "./Button";

describe("Button", () => {
  it("renders a button unchanged", () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
  });
});
