import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Mooc from "./Mooc";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  slides: [
    {
      title: {
        content:
          "Learn how to use digital tools to <i>strengthen</i> your democracy 1",
        color: "common.white",
      },
      link: {
        content: "Learn more",
        color: "primary",
      },
      image: {
        src: "/images/mooc.png",
      },
    },
    {
      title: {
        content:
          "Learn how to use digital tools to <i>strengthen</i> your democracy 2",
        color: "common.white",
      },
      link: {
        content: "Learn more",
        color: "primary",
      },
      image: {
        src: "/images/mooc.png",
      },
    },
    {
      title: {
        content:
          "Learn how to use digital tools to <i>strengthen</i> your democracy 3",
        color: "common.white",
      },
      link: {
        content: "Learn more",
        color: "primary",
      },
      image: {
        src: "/images/mooc.png",
      },
    },
  ],
};

describe("<Mooc/>", () => {
  it("renders unchanged", () => {
    const { container } = render(<Mooc {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
