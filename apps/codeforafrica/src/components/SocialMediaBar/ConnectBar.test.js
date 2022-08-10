import { createRender } from "@commons-ui/testing-library";
import React from "react";

import SocialMediaBar from "./SocialMediaBar";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<SocialMediaBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<SocialMediaBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
