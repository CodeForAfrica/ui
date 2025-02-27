import { render } from "@commons-ui/testing-library";
import React from "react";

import Image from ".";

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
