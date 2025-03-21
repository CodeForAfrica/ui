import { createRender } from "@commons-ui/testing-library";
import React from "react";

import RelatedProjects from "./RelatedProjects";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Explore other projects",
};

describe("<RelatedStories />", () => {
  it("renders unchanged", () => {
    const { container } = render(<RelatedProjects {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
