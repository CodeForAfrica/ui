import { createRender } from "@commons-ui/testing-library";
import React from "react";

import TreeView from ".";

import theme from "@/climatemappedafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  items: [
    {
      title: "Annual Temperature",
      children: [
        {
          title: "Annual Temperature",
        },
      ],
    },
    {
      title: "Temperature Variation",
      children: [
        {
          title: "Decadal Temperature Variation",
        },
      ],
    },
  ],
};

describe("<TreeView />", () => {
  it("renders unchanged", () => {
    const { container } = render(<TreeView {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
