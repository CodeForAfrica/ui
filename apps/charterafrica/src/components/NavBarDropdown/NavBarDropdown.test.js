import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NavBarDropdown from "./NavBarDropdown";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<Layout />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NavBarDropdown />);
    expect(container).toMatchSnapshot();
  });
});
