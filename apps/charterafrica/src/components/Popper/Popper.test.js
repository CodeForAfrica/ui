import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Popper from "./Popper";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<Popper />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <Popper>
        <div />
      </Popper>
    );
    expect(container).toMatchSnapshot();
  });
});
