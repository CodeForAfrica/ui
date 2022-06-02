import { createRender } from "@commons-ui/testing-library";
import React from "react";

import TwoToneBackground from "./TwoToneBackground";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<NextPreviousPagination />", () => {
  it("renders unchanged", () => {
    const { container } = render(<TwoToneBackground {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
