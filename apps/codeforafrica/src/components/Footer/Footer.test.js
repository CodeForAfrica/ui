import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Footer from "./Footer";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: "",
    isReady: true,
  })),
}));

const defaultProps = {
  subscription: {
    embedCode: "",
    title: "Subscribe",
  },
  secondaryMenu: [
    { content: "Imprint", href: "/imprint" },
    { content: "Privacy policy", href: "/policy" },
  ],
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

describe("<Footer />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Footer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
