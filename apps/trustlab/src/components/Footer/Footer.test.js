import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Footer from "./Footer";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  subscription: {
    embedCode: "",
    title: "Subscribe",
  },
  secondaryMenu: [
    { content: "Imprint", href: "/imprint" },
    { content: "Privacy policy", href: "/policy" },
  ],
  menus: [
    {
      content: "Our Work",
      href: "/our-work",
    },
    {
      content: "About",
      href: "/about",
    },
    {
      content: "Stories",
      href: "/about",
    },
    {
      content: "Opportunity",
      href: "/opportunity",
    },
    {
      content: "Contact",
      href: "/contact",
    },
  ],
};

describe("<Footer />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Footer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
