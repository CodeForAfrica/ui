import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ProjectPageHeader from "./ProjectPageHeader";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  href: "/projects/test-project",
  tag: "Iniatives",
  externalLink: { href: "https://codeforafrica.org" },
};

describe("<ProjectPageHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ProjectPageHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
