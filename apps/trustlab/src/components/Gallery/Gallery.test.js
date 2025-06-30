import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Gallery from "./Gallery";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  images: [],
  title: "Gallery Title",
};

describe("<Gallery />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Gallery {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
