import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Panel from ".";

import theme from "@/climatemappedafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  // TODO: figure out a way of setting up profile here. Currently, it's too big.
  primaryProfile: {},
};

describe("<Panel />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Panel {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
