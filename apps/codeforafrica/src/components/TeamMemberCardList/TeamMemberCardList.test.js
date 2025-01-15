import { createRender } from "@commons-ui/testing-library";
import React from "react";

import TeamMemberCardList from "./TeamMemberCardList";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

describe("<TeamMemberCardList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<TeamMemberCardList />);
    expect(container).toMatchSnapshot();
  });
});
