import { render } from "@commons-ui/testing-library";
import React from "react";

import PagesRouterLink from "./PagesRouterLink";

describe("<PagesRouterLink />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <PagesRouterLink href="/">Home</PagesRouterLink>,
    );
    expect(container).toMatchSnapshot();
  });
});
