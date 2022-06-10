import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OfficeAddresses from "./OfficeAddresses";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<OfficeAddresses />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OfficeAddresses {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
