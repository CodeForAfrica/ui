import { render } from "@testing-library/react";
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
