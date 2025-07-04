import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Pagination from "./Pagination";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  count: 5,
  onChange: () => {},
  page: 1,
};

describe("<Pagination />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Pagination {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
