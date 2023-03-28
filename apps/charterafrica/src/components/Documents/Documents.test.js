import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Documents from "./Documents";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  group: "ADF",
  options: {
    showNotes: true,
    showSearch: true,
    showText: true,
    showZoom: true,
  },
};

describe("<Documents />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Documents {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
