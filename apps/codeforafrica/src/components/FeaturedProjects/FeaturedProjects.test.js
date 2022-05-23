import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FeaturedProjects from "./FeaturedProjects";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });
const defaultProps = {
  projects: [],
};
describe("<FeaturedProjects />", () => {
  it("renders unchanged", () => {
    const { container } = render(<FeaturedProjects {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
