import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DocumentList from "./DocumentList";

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

describe("<DocumentList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DocumentList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
