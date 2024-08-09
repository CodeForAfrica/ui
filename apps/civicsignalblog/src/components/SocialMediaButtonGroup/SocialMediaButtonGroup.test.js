import { createRender } from "@commons-ui/testing-library";
import React from "react";

import SocialMediaButtonGroup from "./SocialMediaButtonGroup";

import theme from "@/civicsignalblog/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<SocialMediaButtonGroup />", () => {
  it("renders unchanged", () => {
    const { container } = render(<SocialMediaButtonGroup {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
