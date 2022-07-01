import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Input from "./Input";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<Input />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Input />);
    expect(container).toMatchSnapshot();
  });
});
