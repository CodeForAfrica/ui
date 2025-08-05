import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Button from "./StyledButton";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  color: "#000000",
};

describe("<StyledButton />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <Button {...defaultProps}>Custom Button</Button>,
    );
    expect(container).toMatchSnapshot();
  });
});
