import { createRender } from "@commons-ui/testing-library";
import React from "react";

import GoogleMap from "./GoogleMap";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

describe("<GoogleMap />", () => {
  it("renders unchanged", () => {
    const { container } = render(<GoogleMap />);
    expect(container).toMatchSnapshot();
  });
});
