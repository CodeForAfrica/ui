import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NavList from "./NavList";

import { createTheme } from "@/commons-ui/core/styles";

const render = createRender({ theme: createTheme() });

describe("<NavList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NavList direction="column" />);
    expect(container).toMatchSnapshot();
  });
});
