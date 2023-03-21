import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NextPrevPagination from "./NextPrevPagination";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  count: 10,
  onPageChange: () => {},
};

describe("<NextPrevPagination />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NextPrevPagination {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
