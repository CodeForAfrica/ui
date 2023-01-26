import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NavBarDropdown from "./NavBarDropdown";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  menu: {
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "Tools",
        href: "/resources/tools",
      },
      {
        label: "Data",
        href: "/resources/data",
      },
      {
        label: "People",
        href: "/resources/people",
      },
    ],
  },
};

describe("<NavBarDropdown />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NavBarDropdown {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
