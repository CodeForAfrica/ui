import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DatasetFilterBar from "./DatasetFilterBar";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  countries: ["Kenya", "Uganda", "Tanzania", "Nigeria"],
  tags: ["Agriculture", "Health", "Education"],
};

describe("<DatasetFilterBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DatasetFilterBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
