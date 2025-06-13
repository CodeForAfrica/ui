import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PageOverview from "./PageOverview";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Overview Title",
  description: [
    {
      type: "paragraph",
      children: [
        {
          text: "This is an overview description.",
        },
      ],
    },
  ],
  image: {
    url: "/images/cms/blocks/overview.png",
    alt: "Example Image",
  },
};

describe("<PageOverview />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PageOverview {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
