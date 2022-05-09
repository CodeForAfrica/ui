import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NavigationNavList from ".";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
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

describe("<NavigationNavList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NavigationNavList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
