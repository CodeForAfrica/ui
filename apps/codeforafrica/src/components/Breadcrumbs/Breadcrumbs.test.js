import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Breadcrumbs from "./Breadcrumbs";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  crumbs: [{ label: "Our Work", href: "/projects" }, { label: "Initiatives" }],
};

describe("<Breadcrumbs />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Breadcrumbs {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
