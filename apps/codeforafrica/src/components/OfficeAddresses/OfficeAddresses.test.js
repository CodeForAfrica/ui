import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OfficeAddresses from "./OfficeAddresses";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("<OfficeAddresses />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OfficeAddresses {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
