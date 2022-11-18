import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NavBar from "./NavBar";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: "",
    isReady: true,
  })),
}));

const defaultProps = {
  logo: {
    alt: "Charter Africa",
    src: "/images/charter-logo.svg",
  },
  menus: [
    {
      title: "Resources",
      href: "resources",
      children: [
        {
          title: "Tools",
          href: "resources/tools",
        },
        {
          title: "Data",
          href: "resources/data",
        },
        {
          title: "People",
          href: "resources/people",
        },
      ],
    },
    {
      title: "Knowledge",
      href: "knowledge",
      children: [
        {
          title: "Explainers",
          href: "knowledge/explainers",
        },
        {
          title: "News",
          href: "knowledge/news",
        },
        {
          title: "Research",
          href: "knowledge/research",
        },
        {
          title: "Academy",
          href: "knowledge/academy",
        },
      ],
    },
    {
      title: "Oppportunities",
      href: "opportunities",
      children: [
        {
          title: "Grants and Fellowships",
          href: "opportunities/grants-and-fellowships",
        },
        {
          title: "Events",
          href: "opportunities/events",
        },
        {
          title: "Community",
          href: "opportunities/community",
        },
        {
          title: "Democracy Helpdesk",
          href: "opportunities/democracy-helpdesk",
        },
      ],
    },
    {
      title: "About",
      href: "about",
    },
  ],
};

describe("<NavBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NavBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
