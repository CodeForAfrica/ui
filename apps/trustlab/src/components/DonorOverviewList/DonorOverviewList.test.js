import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DonorOverviewList from "./DonorOverviewList";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  slug: "donor-overview-list",
  partners: [],
};

describe("<DonorOverviewList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DonorOverviewList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
