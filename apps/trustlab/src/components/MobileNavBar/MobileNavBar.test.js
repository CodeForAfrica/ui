import { createRender } from "@commons-ui/testing-library";
import React from "react";

import MobileNavigation from ".";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

describe("<MobileNavigation />", () => {
  it("renders unchanged", () => {
    const { container } = render(<MobileNavigation />);
    expect(container).toMatchSnapshot();
  });
});
