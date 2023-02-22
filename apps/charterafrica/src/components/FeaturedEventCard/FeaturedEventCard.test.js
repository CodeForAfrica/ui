import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FeaturedEventCard from "./FeaturedEventCard";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  id: 1,
  title: "Democratic Governance in Zambia",
  category: "Topic Name",
  excerpt:
    "Lorem ipsum dolor sit amet con sectetur adipiscing elit mi, interdum blandit fring illa fus. adipiscing elit mi, adipiscing.",
  featured: true,
  date: "2023-02-11",
  link: {
    href: "/",
  },
  image: {
    id: "63d2622aafe25f6469605eae",
    alt: `Grant 1`,
    prefix: "media",
    filename: "Rectangle 113.jpg",
    mimeType: "image/jpg",
    filesize: 257010,
    width: 1236,
    height: 696,
    createdAt: "2023-01-26T11:21:14.868Z",
    updatedAt: "2023-01-26T11:21:14.868Z",
    url: "/images/featured-event.svg",
  },
};

describe("FeaturedEventCard", () => {
  it("should render", () => {
    const { container } = render(<FeaturedEventCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
