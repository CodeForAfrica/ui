import { createRender } from "@commons-ui/testing-library";
import React from "react";

import TwoToneBackground from "./TwoToneBackground";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<NextPreviousPagination />", () => {
  it("renders unchanged", () => {
    const { container } = render(<TwoToneBackground {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
