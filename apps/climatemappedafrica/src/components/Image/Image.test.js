import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Image from ".";

import theme from "@/climatemappedafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  alt: "Image",
  height: 100,
  src: "/image.jpg",
  width: 100,
};

describe("<Image />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Image {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
