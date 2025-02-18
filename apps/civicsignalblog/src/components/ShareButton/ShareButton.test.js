import { createRender } from "@commons-ui/testing-library";
import React from "react";

import {
  FacebookShareBarButton,
  LinkedinShareBarButton,
  TwitterShareBarButton,
} from "./ShareButton";

import theme from "@/civicsignalblog/theme";

const render = createRender({ theme });

const defaultProps = {
  tooltipProps: { title: "Title" },
};

describe("<FacebookShareBarButton />", () => {
  it("renders unchanged", () => {
    const { container } = render(<FacebookShareBarButton {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});

describe("<LinkedinShareBarButton />", () => {
  it("renders unchanged", () => {
    const { container } = render(<LinkedinShareBarButton {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});

describe("<TwitterShareBarButton />", () => {
  it("renders unchanged", () => {
    const { container } = render(<TwitterShareBarButton {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
