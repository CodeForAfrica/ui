import { createRender } from "@commons-ui/testing-library";
import React from "react";

import TeamMemberCard from "./TeamMemberCard";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  link: {},
  image: {},
};

describe("<TeamMemberCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<TeamMemberCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
