import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OurTeam from "./OurTeam";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Our team",
};

describe("<OurTeam />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OurTeam {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
