import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DonorOverview from "./DonorOverview";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  slug: "donor-overview",
  partners: [],
};

describe("<DonorOverview />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DonorOverview {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
