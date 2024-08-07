import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Page from "./Page";

import theme from "@/civicsignalblog/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
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
