import { render } from "@commons-ui/testing-library";
import React from "react";

import Location from "./Location";

const defaultProps = {
  isLoading: false,
  highlights: [
    {
      title: "Population",
      value: "10,000,000",
    },
    {
      title: "GDP",
      value: "10,000,000",
    },
  ],
  tags: [
    {
      href: "/explore",
      level: "Country",
      name: "Kenya",
    },
    {
      href: "/explore/county-11",
      level: "County",
      name: "Isiolo",
    },
  ],
};

describe("Location", () => {
  it("renders unchanged", () => {
    const { container } = render(<Location {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
