import { render } from "@commons-ui/testing-library";
import React from "react";

import ChartTooltip from "./ChartTooltip";

const defaultTooltipProps = {
  id: "1",
  geoCode: "6672",
  value: null,
  itemColor: "",
  event: null,
  title: "",
  formattedValue: undefined,
};

describe("ChartTooltip", () => {
  it("renders unchanged", () => {
    const { container } = render(<ChartTooltip {...defaultTooltipProps} />);
    expect(container).toMatchSnapshot();
  });
});
