import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DropdownMenu from "./DropdownMenu";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  items: [
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
};

describe("<DropdownMenu />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DropdownMenu {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
