import { createRender } from "@commons-ui/testing-library";
import React from "react";

import GrantsFellowshipsHeader from "./GrantFellowshipHeader";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Grants and Fellowships",
};

describe("<GrantsFellowshipsHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(<GrantsFellowshipsHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
