import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OpenCloseIcon from "./OpenCloseIcon";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  open: false,
};

describe("<OpenCloseIcon />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OpenCloseIcon {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
