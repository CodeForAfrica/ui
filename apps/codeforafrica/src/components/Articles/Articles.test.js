import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Articles from "./Articles";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  articles: [
    {
      title: "Battle for gender equality in African media continues",
      excerpt: [
        {
          children: [
            {
              text: "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
              children: null,
            },
          ],
        },
      ],
      publishedOn: "Jan 6, 2022",
      image: {
        src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885664/codeforafrica/unsplash_L6hr1BptcNc_of23p3.png",
        alt: "Featured Article Image",
      },
      readMoreLabel: "Read Story",
      href: "/stories/article-1",
    },
  ],
  featured: {
    title: "Battle for gender equality in African media continues",
    excerpt: [
      {
        children: [
          {
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit mattis, vestibulum potenti rhoncus eget lacus fermentum taciti quam, quis curae accumsan viverra semper dapibus sed. ",
            children: null,
          },
        ],
      },
    ],
    publishedOn: "Jan 6, 2022",
    image: {
      src: "https://res.cloudinary.com/code-for-africa/image/upload/v1650885664/codeforafrica/unsplash_L6hr1BptcNc_of23p3.png",
      alt: "Featured Article Image",
    },
    readMoreLabel: "Read Story",
    href: "/stories/article-1",
  },
  pagination: {
    count: 10,
    page: 1,
  },
  labels: {
    readMore: "Read More",
    search: "Search",
  },
  tags: ["tag1", "tag2"],
  title: "Title",
};

describe("<Articles />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Articles {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
