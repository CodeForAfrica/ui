import { render } from "@commons-ui/testing-library";
import React from "react";

import StyledLink from "./StyledLink";

describe("<StyledLink />", () => {
  it("renders unchanged", () => {
    const { container } = render(<StyledLink href="/">Home</StyledLink>);
    expect(container).toMatchSnapshot();
  });
});
