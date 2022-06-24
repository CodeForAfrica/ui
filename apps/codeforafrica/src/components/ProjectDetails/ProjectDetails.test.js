import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ProjectDetails from "./ProjectDetails";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  description:
    "This award-winning initiative works to give citizens a new perspective on their lives. Using drone technology, africanDRONE empowers local pilots through a self-help network that offers seed funding, skills development, resource sharing, advocacy, and networking opportunities for members. The goal is to support the evolution of a vibrant and diverse drone ecosystem across Africa.",
  links: [
    {
      slug: "data",
      content: "Launch Project",
      href: "https://codeforafrica.org",
    },
    {
      slug: "github",
      content: "GitHub",
      href: "https://github.com/CodeForAfrica",
    },
  ],
};

describe("<ProjectDetails />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ProjectDetails {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
