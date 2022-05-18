import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ProjectCardMedia from "./ProjectCardMedia";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<ProjectCardMedia />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ProjectCardMedia />);
    expect(container).toMatchSnapshot();
  });
});
