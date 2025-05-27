import { render } from "@commons-ui/testing-library";
import React from "react";

import MobileNavBar from "./MobileNavBar";

describe("<MobileNavBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<MobileNavBar />);
    expect(container).toMatchSnapshot();
  });
});
