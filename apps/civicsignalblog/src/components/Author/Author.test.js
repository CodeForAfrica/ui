import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Author from "./Author";

import theme from "@/civicsignalblog/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<Author />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Author />);
    expect(container).toMatchSnapshot();
  });
});
