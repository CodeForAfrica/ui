import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FeaturedVideoCard from "./FeaturedVideoCard";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  videoId: "awPQ5LfoTys",
  title: "Latest Release",
  publishedAt: "23/06/2024",
  airedOnText: "Aired on",
};

describe("FeaturedVideoCard", () => {
  it("should render", () => {
    const { container } = render(<FeaturedVideoCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
