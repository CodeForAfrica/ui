import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Opportunities from "./Opportunities";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  opportunities: [],
  pagination: {
    count: 0,
    page: 1,
  },
  tags: [],
  labels: {
    search: "Search",
    readMore: "Read more",
  },
};

describe("<Opportunities />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Opportunities {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
