import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Impressum from "./Impressum";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  content: [
    {
      children: [
        {
          text: "European Partnership for Democracy (EPD)\nRue Froissart 123-133\n1040 Brussels, Belgium",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "EPD is registered in Belgium (0648.708.779).",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "",
          children: null,
        },
      ],
    },
    {
      children: [
        {
          text: "You can contact EPD via email (info@epd.eu) or by phone (+32 2 733 2282).",
          children: null,
        },
      ],
    },
  ],
  image: {
    id: "63f9da37de53f4d08657fdee",
    alt: "S",
    prefix: "media",
    filename: "3a134a6ee61bdaf42fd06b59f46cf9fe-1.png",
    mimeType: "image/png",
    filesize: 42224,
    width: 731,
    height: 287,
    createdAt: "2023-02-25T09:51:51.611Z",
    updatedAt: "2023-02-25T09:51:51.611Z",
    url: "http://localhost:3000/media/3a134a6ee61bdaf42fd06b59f46cf9fe-1.png",
  },
  id: "63f85813073246f4d1629a78",
  slug: "impressum",
};

describe("<Impressum />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Impressum {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
