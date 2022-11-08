import { render } from "@commons-ui/testing-library";
import React from "react";

import Figure from "./Figure";

const defaultProps = {
  ImageProps: {
    src: "/image.jpg",
    alt: "Image",
  },
};

describe("<Figure />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Figure {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
