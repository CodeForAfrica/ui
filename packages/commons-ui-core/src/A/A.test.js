import { render } from "@testing-library/react";
import React from "react";

import A from ".";

describe("A", () => {
  it("renders unchanged", () => {
    const { container } = render(<A href="www.test.com">Link</A>);
    expect(container).toMatchSnapshot();
  });
});
