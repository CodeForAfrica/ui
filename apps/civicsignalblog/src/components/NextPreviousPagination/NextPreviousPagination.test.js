import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NextPreviousPagination from "./NextPreviousPagination";

import theme from "@/civicsignalblog/theme";

const render = createRender({ theme });

const defaultProps = {
  count: 1,
};

describe("<NextPreviousPagination />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NextPreviousPagination {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
