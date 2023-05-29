import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Infographic from "./Infographic";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  infographicId: "charter-project-infographic",
  url: "http://localhost:3003",
};

describe("<Infographic />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Infographic {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
