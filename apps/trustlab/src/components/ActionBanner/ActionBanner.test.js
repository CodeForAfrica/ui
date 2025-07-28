import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ActionBanner from "./ActionBanner";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  button: { label: "Test Page" },
};

describe("<Page />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ActionBanner {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
