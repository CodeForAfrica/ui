import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FooterNavList from ".";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

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

describe("<FooterNavList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<FooterNavList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
