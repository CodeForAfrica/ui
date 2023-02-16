import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Hero from "./Hero";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  slug: "hero",
  slides: [
    {
      id: 1,
      title: {
        color: "common.white",
        content: [
          {
            children: [
              {
                text: "Find Africa's best ",
              },
              {
                text: "digital democracy",
                italic: true,
              },
              {
                text: " tools",
              },
            ],
          },
        ],
      },
      subheading: {
        color: "#fff",
        content: "Easy to use resources for democracy activists",
      },
      background: {
        blendMode: "multiply, luminosity",
        color: "#4E2037",
        src: "/images/hero-slide-1.jpg",
      },
      links: [
        {
          color: "secondary",
          icon: {
            alt: "Software",
            src: "/icons/Type=folder, Size=64, Color=CurrentColor.svg",
          },
          label: "Explore software",
        },
        {
          color: "secondary",
          icon: {
            alt: "Database",
            src: "/icons/Type=database, Size=64, Color=CurrentColor.svg",
          },
          label: "Browse database",
        },
      ],
    },
  ],
};

describe("<Hero />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Hero {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
