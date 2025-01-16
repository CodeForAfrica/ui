import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ProjectDescription from "./ProjectDescription";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Description",
  links: [
    {
      content: "Github",
      href: "https://github.com/CodeForAfrica",
      type: "github",
    },
  ],
};

describe("<ProjectDescription />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ProjectDescription {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
