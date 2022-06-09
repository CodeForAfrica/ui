import { createRender } from "@commons-ui/testing-library";
import React from "react";

import AccoladeBadgeList from "./AccoladeBadgeList";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<AccoladeBadgeList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<AccoladeBadgeList />);
    expect(container).toMatchSnapshot();
  });
});
