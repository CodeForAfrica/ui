import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ProjectCardMedia from "./ProjectCardMedia";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

describe("<ProjectCardMedia />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ProjectCardMedia />);
    expect(container).toMatchSnapshot();
  });
});
