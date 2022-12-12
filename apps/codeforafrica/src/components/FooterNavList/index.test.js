import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FooterNavList from ".";

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
};

describe("<FooterNavList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<FooterNavList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
