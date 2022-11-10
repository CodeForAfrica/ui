import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FocalCountries from "./FocalCountries";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  footer: {
    logo: {
      alt: "EU",
      src: "/images/eu.png",
    },
  },
};

describe("<Layout />", () => {
  it("renders unchanged", () => {
    const { container } = render(<FocalCountries {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
