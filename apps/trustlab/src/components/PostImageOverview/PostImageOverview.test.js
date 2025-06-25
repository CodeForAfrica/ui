import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PostImageOverview from "./PostImageOverview";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<PostImageOverview />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PostImageOverview {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
