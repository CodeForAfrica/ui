import { createRender } from "@commons-ui/testing-library";
import React from "react";

import TeamMemberCard from "./TeamMemberCard";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<TeamMemberCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<TeamMemberCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
