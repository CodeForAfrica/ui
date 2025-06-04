import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PartnerOverviewList from "./PartnerOverviewList";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  slug: "partner-overview-list",
  partners: [],
};

describe("<PartnerOverviewList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PartnerOverviewList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
