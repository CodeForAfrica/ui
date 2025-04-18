import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PaginationButton from "./PaginationButton";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  page: 1,
  type: "previous",
};

describe("<PaginationButton />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PaginationButton {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
