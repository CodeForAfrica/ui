import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OurDonors from "./OurDonors";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  slug: "our-donors",
  partners: [],
};

describe("<OurDonors />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OurDonors {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
