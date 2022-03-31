import { render } from "@testing-library/react";
import React from "react";

import Link from ".";

describe("Link", () => {
  it("renders unchanged", () => {
    const { container } = render(<Link href="/" />);
    expect(container).toMatchSnapshot();
  });
});
