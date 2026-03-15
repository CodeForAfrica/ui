import { createRender } from "@commons-ui/testing-library";
import React from "react";

import HorizontalGallery from "./HorizontalGallery";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Gallery",
  images: [],
};

describe("<HorizontalGallery />", () => {
  it("renders unchanged", () => {
    const { container } = render(<HorizontalGallery {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
