import { createRender } from "@commons-ui/testing-library";
import React from "react";

import MobileNavigation from ".";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<MobileNavigation />", () => {
  it("renders unchanged", () => {
    const { container } = render(<MobileNavigation />);
    expect(container).toMatchSnapshot();
  });
});
