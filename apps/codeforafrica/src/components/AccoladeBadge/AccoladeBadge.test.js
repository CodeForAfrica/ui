import { createRender } from "@commons-ui/testing-library";
import React from "react";

import AccoladeBadge from "./AccoladeBadge";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<AccoladeBadge />", () => {
  it("renders unchanged", () => {
    const { container } = render(<AccoladeBadge />);
    expect(container).toMatchSnapshot();
  });
});
