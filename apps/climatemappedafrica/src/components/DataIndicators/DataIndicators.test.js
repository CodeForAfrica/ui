import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DataIndicators from "./DataIndicators";

import theme from "@/climatemappedafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Indicators",
  indicators: [
    {
      title: "Overview",
      description: null,
    },
  ],
};

describe("<RichText />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DataIndicators {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
