import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DesktopNavigation from ".";

import theme from "@/civicsignalblog/theme";

const render = createRender({ theme });

describe("<DesktopNavigation />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DesktopNavigation />);
    expect(container).toMatchSnapshot();
  });
});
