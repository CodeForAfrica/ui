import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Popper from "./Popper";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  open: false,
};

describe("<Popper />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <Popper {...defaultProps}>
        <div />
      </Popper>,
    );
    expect(container).toMatchSnapshot();
  });
});
