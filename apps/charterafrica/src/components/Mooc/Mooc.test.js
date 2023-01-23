import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Mooc from "./Mooc";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: {
    color: "secondary",
    content: [
      {
        children: [
          {
            text: "Learn how to use digital tools to ",
          },
          {
            text: "strengthen",
            italic: true,
          },
          {
            text: " your democracy",
          },
        ],
      },
    ],
  },
  link: {
    content: "Learn more",
    color: "primary",
  },
  image: {
    src: "/images/mooc.png",
    alt: "MOOC",
  },
};

describe("<Mooc/>", () => {
  it("renders unchanged", () => {
    const { container } = render(<Mooc {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
