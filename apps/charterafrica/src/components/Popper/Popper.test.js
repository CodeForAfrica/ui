import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Popper from "./Popper";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  open: false,
};

describe("<Popper />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <Popper {...defaultProps}>
        <div />
      </Popper>
    );
    expect(container).toMatchSnapshot();
  });
});
