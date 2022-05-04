import { render } from "@commons-ui/testing-library";
import React from "react";

import Link from "./Link";

describe("<Link />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Link href="/" />);
    expect(container).toMatchSnapshot();
  });
});
