import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Post from "./Post";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  publishedOn: "2023-02-05T21:00:00.000Z",
  _status: "published",
  author: "Junior Author",
  image: {
    alt: "Hero 1",
    url: "http://localhost:3000/media/hero-slide-1.jpg",
  },
  date: "February 6, 2023 at 12:00:00 AM",
  link: {
    href: "/knowledge/research/research-title-goes-here-and-spans-over-second-line",
  },
};

describe("<Post />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Post {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
