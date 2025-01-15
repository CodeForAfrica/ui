import { createRender } from "@commons-ui/testing-library";
import React from "react";

import GuidingPrinciplesCardList from "./GuidingPrinciplesCardList";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<GuidingPrinciplesList />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <GuidingPrinciplesCardList {...defaultProps} />,
    );
    expect(container).toMatchSnapshot();
  });
});
