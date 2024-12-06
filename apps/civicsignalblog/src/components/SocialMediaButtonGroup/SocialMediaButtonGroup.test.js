import { createRender } from "@commons-ui/testing-library";
import React from "react";

import SocialMediaButtonGroup from "./SocialMediaButtonGroup";

import theme from "@/civicsignalblog/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<SocialMediaButtonGroup />", () => {
  it("renders unchanged", () => {
    const { container } = render(<SocialMediaButtonGroup {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
