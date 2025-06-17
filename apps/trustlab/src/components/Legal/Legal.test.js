import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Legal from "./Legal";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  content: [
    {
      type: "paragraph",
      children: [
        {
          text: "This is a test Legal paragraph.",
        },
      ],
    },
  ],
};

describe("<Legal />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Legal {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
