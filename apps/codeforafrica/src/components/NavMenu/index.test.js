import React from "react";

import NavMenu from ".";

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

describe("<NavMenu />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NavMenu {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
