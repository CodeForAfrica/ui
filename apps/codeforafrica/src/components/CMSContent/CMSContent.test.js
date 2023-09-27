import { createRender } from "@commons-ui/testing-library";
import React from "react";

import CMSContent from "./CMSContent";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  children: [],
};

describe("<CMSContent />", () => {
  it("renders unchanged", () => {
    const { container } = render(<CMSContent {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
