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
        content: "Find Africa's best <br><i>digital democracy</i> tools",
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
          content: "Explore software",
          icon: {
            src: "/icons/Type=folder, Size=64, Color=CurrentColor.svg",
          },
        },
        {
          color: "secondary",
          content: "Browse database",
          icon: {
            src: "/icons/Type=database, Size=64, Color=CurrentColor.svg",
          },
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
