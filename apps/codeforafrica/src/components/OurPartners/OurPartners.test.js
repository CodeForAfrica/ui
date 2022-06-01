import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OurPartners from "./OurPartners";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  slug: "our-partners",
  partners: [],
};

describe("<OurPartners />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OurPartners {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
