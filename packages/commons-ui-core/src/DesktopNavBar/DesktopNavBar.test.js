import { render } from "@commons-ui/testing-library";
import React from "react";

import DesktopNavBar from "./DesktopNavBar";

describe("<DesktopNavBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DesktopNavBar />);
    expect(container).toMatchSnapshot();
  });
});
