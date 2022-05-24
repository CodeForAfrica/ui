import { createRender } from "@commons-ui/testing-library";
import React from "react";

import TeamMemberCardList from "./TeamMemberCardList";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<TeamMemberCardList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<TeamMemberCardList />);
    expect(container).toMatchSnapshot();
  });
});
