import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ProjectCard from "./ProjectCard";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = { link: {} };

describe("<ProjectCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ProjectCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
