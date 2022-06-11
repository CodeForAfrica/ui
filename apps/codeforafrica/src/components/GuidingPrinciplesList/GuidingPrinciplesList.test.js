import { createRender } from "@commons-ui/testing-library";
import React from "react";

import GuidingPrinciplesList from "./GuidingPrinciplesList";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<GuidingPrinciplesList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<GuidingPrinciplesList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
