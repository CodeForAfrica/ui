import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NavList from ".";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<NavList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NavList direction="column" />);
    expect(container).toMatchSnapshot();
  });
});
