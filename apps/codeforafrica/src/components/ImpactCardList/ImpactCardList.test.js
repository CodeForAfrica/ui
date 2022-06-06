import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ImpactCardList from "./ImpactCardList";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<ImpactCardList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ImpactCardList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
