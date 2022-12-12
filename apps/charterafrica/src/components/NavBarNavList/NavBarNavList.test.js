import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NavBarNavList from "./NavBarNavList";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
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

describe("<NavBarNavList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NavBarNavList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
