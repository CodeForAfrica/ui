import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DesktopNavigation from ".";

import theme from "@/civicsignalblog/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<DesktopNavigation />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DesktopNavigation />);
    expect(container).toMatchSnapshot();
  });
});
