import { render } from "@commons-ui/testing-library";
import React from "react";

import NavBarNavList from ".";

const defaultProps = {
  menus: [
    {
      label: "Our Work",
      href: "/our-work",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Stories",
      href: "/about",
    },
    {
      label: "Opportunity",
      href: "/opportunity",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  socialLinks: [
    {
      url: "https://www.facebook.com/CodeForAfrica",
      platform: "Facebook",
    },
    {
      url: "https://twitter.com/Code4Africa",
      platform: "Twitter",
    },
  ],
  Component: "a",
};

describe("<NavBarNavList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NavBarNavList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
