import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NavBarNavList from ".";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  menu: [
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
  socialLinks: [
    {
      url: "https://www.facebook.com/CodeForAfrica",
      platform: "facebook",
    },
    {
      url: "https://twitter.com/Code4Africa",
      platform: "twitter",
    },
  ],
};

describe("<NavBarNavList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NavBarNavList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
