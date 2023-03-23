import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DocumentList from "./DocumentList";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  description: [],
  groups: ["ADF", "AFRICAN UNION"],
  locale: "en",
};

describe("<DocumentList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DocumentList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
