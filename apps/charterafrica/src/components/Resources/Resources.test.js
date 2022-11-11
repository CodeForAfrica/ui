import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Resources from "./Resources";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  slug: "resources",
  title: "Our Resources",
  resources: [
    {
      background: {
        color: "#4D2137",
        src: "/images/resources-tools.png",
      },
      icon: {
        color: "#F7CE46",
        src: "/icons/Type=database, Size=64, Color=CurrentColor.svg",
      },
      link: {
        content: "Browse tools",
      },
      name: "Tools",
      value: "54,000",
    },
    {
      background: {
        color: "#CC6F58",
        src: "/images/resources-people.png",
      },
      icon: {
        color: "#F29D88",
        src: "/icons/Type=paperclip, Size=64, Color=CurrentColor.svg",
      },
      link: {
        content: "Browse people",
      },
      name: "People",
      value: "54,000",
    },
    {
      background: {
        color: "#699968",
        src: "/images/resources-organisations.png",
      },
      icon: {
        color: "#AAD4A9",
        src: "/icons/Type=users, Size=64, Color=CurrentColor.svg",
      },
      link: {
        content: "Browse organisations",
      },
      name: "Organisations",
      value: "54,000",
    },
    {
      background: {
        color: "#6C5B6D",
        src: "/images/resources-data.png",
      },
      icon: {
        color: "#A790A9",
        src: "/icons/Type=database, Size=64, Color=CurrentColor.svg",
      },
      link: {
        content: "Browse database",
      },
      name: "Data",
      value: "54,000",
    },
  ],
};

describe("<Resources />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Resources {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
