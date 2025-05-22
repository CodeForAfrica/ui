import { render } from "@commons-ui/testing-library";
import React from "react";

import DesktopNavigation from ".";

describe("<DesktopNavigation />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DesktopNavigation />);
    expect(container).toMatchSnapshot();
  });
});
