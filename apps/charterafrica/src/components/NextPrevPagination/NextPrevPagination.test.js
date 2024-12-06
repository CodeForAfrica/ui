import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NextPrevPagination from "./NextPrevPagination";

import theme from "@/charterafrica/theme";

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
