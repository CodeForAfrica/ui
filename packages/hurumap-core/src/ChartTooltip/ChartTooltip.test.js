import { render } from "@commons-ui/testing-library";
import React from "react";

import ChartTooltip from "./ChartTooltip";

describe("ChartTooltip", () => {
  it("renders unchanged", () => {
    const { container } = render(<ChartTooltip />);
    expect(container).toMatchSnapshot();
  });
});
