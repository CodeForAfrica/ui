import { createRender } from "@commons-ui/testing-library";
import React from "react";

import SocialMediaBar from "./SocialMediaBar";

import theme from "@/civicsignalblog/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Connect with: ",
};

describe("<SocialMediaBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<SocialMediaBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
