import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Input from "./Input";

import { createTheme } from "@/commons-ui/core/styles";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme: createTheme() });

describe("<Input />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Input />);
    expect(container).toMatchSnapshot();
  });
});
