import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PartnerOverview from "./PartnerOverview";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  slug: "partner-overview",
  partners: [],
};

describe("<PartnerOverview />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PartnerOverview {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
