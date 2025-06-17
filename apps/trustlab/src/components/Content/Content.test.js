import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Content from "./Content";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  content: [
    {
      type: "paragraph",
      children: [
        {
          text: "This is a test paragraph.",
        },
      ],
    },
  ],
};

describe("<Content />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Content {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
