import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Figure from "./Figure";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

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
