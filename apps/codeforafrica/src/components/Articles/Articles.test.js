import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Articles from "./Articles";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<Articles />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Articles />);
    expect(container).toMatchSnapshot();
  });
});
