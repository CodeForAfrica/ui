import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ProjectPageHeader from "./ProjectPageHeader";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  href: "/projects/test-project",
  tag: "Iniatives",
};

describe("<ProjectPageHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ProjectPageHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
