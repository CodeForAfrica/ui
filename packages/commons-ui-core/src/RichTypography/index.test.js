import { render } from "@testing-library/react";
import React from "react";

import RichTypography from ".";

describe("RichTypography", () => {
  it("renders unchanged", () => {
    render(<RichTypography>Rich Typography</RichTypography>);
    const { container } = render(<RichTypography />);
    expect(container).toMatchSnapshot();
  });

  it("renders html content", () => {
    const { container } = render(
      <RichTypography>
        <b>this is an example</b>
      </RichTypography>
    );
    const node = container.querySelector("b");
    expect(node).toBeTruthy();
  });
});
