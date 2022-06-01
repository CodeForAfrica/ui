import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ImpactCard from "./ImpactCard";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<ImpactCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ImpactCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
