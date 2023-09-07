import { render } from "@commons-ui/testing-library";
import React from "react";

import LineClampedRichTypography from "./LineClampedRichTypography";

const defaultProps = {
  lineClamp: 2,
};

describe("<LineClampedRichTypography />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <LineClampedRichTypography {...defaultProps} />,
    );
    expect(container).toMatchSnapshot();
  });
});
