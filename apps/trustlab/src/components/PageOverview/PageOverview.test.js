import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PageOverview from "./PageOverview";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<PageOverview />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PageOverview {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
