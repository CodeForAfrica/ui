import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NavBar from "./NavBar";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  logo: {
    image: {
      alt: "Charter Africa",
      fill: true,
      src: "/images/charter-logo.svg",
    },
    href: "/",
  },
  menus: [
    {
      label: "Resources",
      href: "/resources",
      children: [
        {
          label: "Tools",
          href: "/resources/tools",
        },
        {
          label: "Data",
          href: "/resources/data",
        },
        {
          label: "People",
          href: "/resources/people",
        },
      ],
    },
    {
      label: "Knowledge",
      href: "/knowledge",
      children: [
        {
          label: "Explainers",
          href: "/knowledge/explainers",
        },
        {
          label: "News",
          href: "/knowledge/news",
        },
        {
          label: "Research",
          href: "/knowledge/research",
        },
        {
          label: "Academy",
          href: "/knowledge/academy",
        },
      ],
    },
    {
      label: "Oppportunities",
      href: "/opportunities",
      children: [
        {
          label: "Grants and Fellowships",
          href: "/opportunities/grants-and-fellowships",
        },
        {
          label: "Events",
          href: "/opportunities/events",
        },
        {
          label: "Community",
          href: "/opportunities/community",
        },
        {
          label: "Democracy Helpdesk",
          href: "/opportunities/democracy-helpdesk",
        },
      ],
    },
    {
      label: "About",
      href: "/about",
    },
  ],
};

describe("<NavBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NavBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
