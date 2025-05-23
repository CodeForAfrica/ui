import { render } from "@commons-ui/testing-library";
import React from "react";

import MobileNavigation from "./MobileNavBar";

describe("<MobileNavigation />", () => {
  it("renders unchanged", () => {
    const { container } = render(<MobileNavigation />);
    expect(container).toMatchSnapshot();
  });
});
