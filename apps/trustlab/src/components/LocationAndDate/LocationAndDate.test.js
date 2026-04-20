import { createRender } from "@commons-ui/testing-library";
import React from "react";

import LocationAndDate from "./LocationAndDate";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  location: "Nairobi, Kenya",
  date: "15-01-2024",
};

describe("<LocationAndDate />", () => {
  it("renders unchanged", () => {
    const { container } = render(<LocationAndDate {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
