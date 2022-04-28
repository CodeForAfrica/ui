import React from "react";

import NavList from ".";

import { render } from "@/codeforafrica/utils/test";

describe("<NavList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NavList />);
    expect(container).toMatchSnapshot();
  });
});
