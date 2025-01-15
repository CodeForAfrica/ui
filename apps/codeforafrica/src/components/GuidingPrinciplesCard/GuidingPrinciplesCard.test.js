import { createRender } from "@commons-ui/testing-library";
import React from "react";

import GuidingPrinciplesCard from "./GuidingPrinciplesCard";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<GuidingPrinciplesCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<GuidingPrinciplesCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
