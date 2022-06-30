import { createRender } from "@commons-ui/testing-library";
import React from "react";

import InputSearch from "./InputSearch";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<InputSearch />", () => {
  it("renders unchanged", () => {
    const { container } = render(<InputSearch />);
    expect(container).toMatchSnapshot();
  });
});
