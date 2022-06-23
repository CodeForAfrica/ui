import { createRender } from "@commons-ui/testing-library";
import React from "react";

import AboutPageHeader from "./AboutPageHeader";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<AboutPageHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(<AboutPageHeader />);
    expect(container).toMatchSnapshot();
  });
});
