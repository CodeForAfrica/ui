import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ProjectDescriptionButton from "./ProjectDescriptionButton";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  content: "Github",
  href: "https://github.com/CodeForAfrica",
  type: "github",
};

describe("<ProjectDescriptionButton />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <ProjectDescriptionButton {...defaultProps} />,
    );
    expect(container).toMatchSnapshot();
  });
});
