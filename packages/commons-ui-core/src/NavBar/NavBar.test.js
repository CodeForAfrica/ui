import { render } from "@commons-ui/testing-library";
import React from "react";

import NavBar from "./NavBar";

import RichTypography from "@/commons-ui/core/RichTypography";

describe("NavBar", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <NavBar>
        <RichTypography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LOGO
        </RichTypography>
      </NavBar>
    );
    expect(container).toMatchSnapshot();
  });
});
