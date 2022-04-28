import React from "react";

import FooterMenu from ".";

import { render } from "@/codeforafrica/utils/test";

const defaultProps = {
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

describe("<FooterMenu />", () => {
  it("renders unchanged", () => {
    const { container } = render(<FooterMenu {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
