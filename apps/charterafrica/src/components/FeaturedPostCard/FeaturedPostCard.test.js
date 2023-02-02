import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FeaturedPostCard from "./FeaturedPostCard";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  post: {
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
    data: "2020-10-10 10:10:10",
    image: {
      src: "/images/featured_post.png",
      alt: "Featured Post",
    },
  },
};

describe("FeaturedPostCard", () => {
  it("should render", () => {
    const { container } = render(<FeaturedPostCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
