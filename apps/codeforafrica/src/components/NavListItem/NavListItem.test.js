import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NavListItem from "./NavListItem";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<NavListItem />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NavListItem />);
    expect(container).toMatchSnapshot();
  });
});
