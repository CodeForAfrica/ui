import { render, screen } from "@commons-ui/testing-library";
import React from "react";

import RichTypography from "./RichTypography";

describe("RichTypography", () => {
  it("renders unchanged", () => {
    const { container } = render(<RichTypography />);
    expect(container).toMatchSnapshot();
  });

  it("renders html content", () => {
    render(
      <RichTypography>
        <b>this is an example</b>
      </RichTypography>
    );
    const node = screen.getByText("this is an example");
    expect(node).toBeInTheDocument();
  });
});
