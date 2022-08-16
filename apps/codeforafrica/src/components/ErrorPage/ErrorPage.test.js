import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ErrorPage from "./ErrorPage";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<ErrorPage />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ErrorPage />);
    expect(container).toMatchSnapshot();
  });
});
