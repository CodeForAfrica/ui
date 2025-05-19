import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ExplorePageError from "./Error";

import theme from "@/climatemappedafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  description: [
    {
      children: [
        {
          text: "Resource not found",
          children: null,
        },
      ],
    },
  ],
  statusCode: 404,
  title: "Page not found",
  link: {
    href: "/",
    children: "Go to homepage",
  },
};

describe("<ExplorePageError/>", () => {
  it("Renders Unchanged", () => {
    const { container } = render(<ExplorePageError {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
