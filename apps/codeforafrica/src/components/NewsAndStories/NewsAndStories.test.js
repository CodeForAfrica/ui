import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NewsAndStories from "./NewsAndStories";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "News and Stories",
  action: {
    label: "Read Stories",
    href: "/stories",
  },
  featured: {
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
  labels: {
    readStory: "Read Story",
  },
};

describe("<NewsAndStories />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NewsAndStories {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
