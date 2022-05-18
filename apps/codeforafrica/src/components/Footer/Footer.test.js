import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Footer from "./Footer";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  subscription: {
    embedCode: "",
  },
  footerLinks: {
    secondary: [
      { name: "Imprint", href: "www.imprint.com" },
      { name: "Privacy policy", href: "www.policy.com" },
    ],
  },
  menu: [
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
};

describe("<Footer />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Footer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
