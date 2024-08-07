import { createRender } from "@commons-ui/testing-library";
import React from "react";

import RelatedStories from "./RelatedStories";

import theme from "@/civicsignalblog/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Related Stories",
  posts: [
    {
      title: "Battle for gender equality in African media continues",
      excerpt:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed.",
      publishedOn: "Jan 6, 2022",
      image: {
        src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885664/codeforafrica/unsplash_L6hr1BptcNc_of23p3.png",
        alt: "Featured Article Image",
      },
      readMoreLabel: "Read Story",
      href: "/stories/article-1",
    },
  ],
};

describe("<RelatedStories />", () => {
  it("renders unchanged", () => {
    const { container } = render(<RelatedStories {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
