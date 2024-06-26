import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OurImpact from "./OurImpact";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<ImpactCardList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OurImpact {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
