import { createRender } from "@commons-ui/testing-library";
import React from "react";

import SectionDivider from "./SectionDivider";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<SectionDivider />", () => {
  it("renders unchanged", () => {
    const { container } = render(<SectionDivider />);
    expect(container).toMatchSnapshot();
  });
});
