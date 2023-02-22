import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PageDescription from "./PageDescription";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  description: [
    {
      children: [
        {
          text: "The largest digital database for ",
          children: null,
        },
        {
          text: "African",
          bold: true,
          children: null,
        },
        {
          text: " communites",
          children: null,
        },
      ],
    },
  ],
  id: "63eb6164c33ade83d9875ee3",
  slug: "page-description",
};

describe("<PageDescription/>", () => {
  it("renders unchanged", () => {
    const { container } = render(<PageDescription {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
