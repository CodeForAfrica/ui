import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NavBarDropdown from "./NavBarDropdown";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  menu: {
    title: "Resources",
    href: "resources",
    children: [
      {
        title: "Tools",
        href: "resources/tools",
      },
      {
        title: "Data",
        href: "resources/data",
      },
      {
        title: "People",
        href: "resources/people",
      },
    ],
  },
};

describe("<Layout />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NavBarDropdown {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
