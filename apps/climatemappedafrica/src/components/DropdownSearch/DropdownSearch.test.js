import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DropdownSearch from "./DownloadSearch";

import theme from "@/climatemappedafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  href: "/explore",
  label: "Search for a location",
  locations: [],
  icon: null,
  placeholder: "Search for a location",
  variant: "explore",
};

describe("<DropdownSearch />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DropdownSearch {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
