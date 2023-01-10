import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DesktopNavBar from "./DesktopNavBar";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  languages: [
    { label: "English", locale: "en" },
    { label: "Francais", locale: "fr" },
  ],
  logo: {
    alt: "Charter Africa",
    src: "/images/charter-logo.svg",
    width: "230",
    height: "60",
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

describe("<DesktopNavBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DesktopNavBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
