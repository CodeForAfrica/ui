import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Page from "./Page";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  theme,
  blocks: [],
};

describe("<Page />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Page {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
