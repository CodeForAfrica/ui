import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ProjectStakeholders from "./ProjectStakeholders";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Details",
  donors: {
    title: "Donors",
    list: [
      {
        name: "World Bank",
      },
    ],
  },
};

describe("<ProjectStakeholders />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ProjectStakeholders {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
