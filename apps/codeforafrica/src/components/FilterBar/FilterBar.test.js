import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FilterBar from "./FilterBar";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  tags: [
    {
      name: "tag",
      slug: "tag",
    },
  ],
  tag: {
    name: "tag",
    slug: "tag",
  },
};

describe("<FilterBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<FilterBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
