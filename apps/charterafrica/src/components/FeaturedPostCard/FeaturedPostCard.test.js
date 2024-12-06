import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FeaturedPostCard from "./FeaturedPostCard";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  slug: "featured-post",
  title: "News Story title goes here and spans over second line",
  excerpt: [
    {
      children: [
        {
          text: "Lorem ipsum dolor sit amet consectetur adipiscing elit tempus nibh cursus, urna porta sagittis non eget taciti nunc sed felis dui, praesent ullamcorper facilisi euismod ut in platea laoreet integer. Lorem ipsum dolor sit amet consectetur",
        },
      ],
    },
  ],
  date: "2020-10-10 10:10:10",
  author: "Author Name",
  image: {
    url: "/images/featured_post.png",
    alt: "Featured Post",
  },
  link: {
    href: "/research/1",
  },
};

describe("FeaturedPostCard", () => {
  it("should render", () => {
    const { container } = render(<FeaturedPostCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
