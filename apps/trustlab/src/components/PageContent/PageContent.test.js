import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PageContent from "./PageContent";

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

describe("<PageContent />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PageContent {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
