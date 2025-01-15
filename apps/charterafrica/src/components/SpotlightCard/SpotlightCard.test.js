import { createRender } from "@commons-ui/testing-library";
import React from "react";

import SpotlightCard from "./SpotlightCard";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<SpotlightCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<SpotlightCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
