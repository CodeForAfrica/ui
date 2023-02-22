import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PageHeader from "./PageHeader";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: [
    {
      children: [
        {
          text: "The largest digital database for ",
          children: null,
        },
        {
          text: "African",
          bold: true,
          children: null,
        },
        {
          text: " communites",
          children: null,
        },
      ],
    },
  ],
  link: {
    linkType: "internal",
    href: null,
  },
  media: {
    image: {
      alt: "About",
      width: 1140,
      height: 760,
      url: "/media/s.jpg",
    },
    align: "0",
  },
  id: "63eb6164c33ade83d9875ee3",
  slug: "page-header",
};

describe("<PageHeader/>", () => {
  it("renders unchanged", () => {
    const { container } = render(<PageHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
