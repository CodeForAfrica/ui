import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FeaturedVideos from "./FeaturedVideos";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  items: [
    {
      videoId: "awPQ5LfoTys",
      title: "Latest Release",
      publishedAt: "23/06/2024",
    },
  ],
  airedOnText: "Aired on",
  title: "Featured Videos",
};

describe("FeaturedVideos", () => {
  it("should render", () => {
    const { container } = render(<FeaturedVideos {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
