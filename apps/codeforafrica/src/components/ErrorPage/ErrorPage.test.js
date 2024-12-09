import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ErrorPage from "./ErrorPage";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

describe("<ErrorPage />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ErrorPage />);
    expect(container).toMatchSnapshot();
  });
});
