import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PostCard from "./PostCard";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Some title",
  author: "Sakwa",
  date: "2023-09-01",
  image: { url: "/image.jpg" },
};

describe("<PostCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PostCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
