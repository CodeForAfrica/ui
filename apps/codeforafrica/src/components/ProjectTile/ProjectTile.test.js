import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ProjectTile from "./ProjectTile";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  slug: "african-drone",
  name: "africanDRONE",
  tagLine: "Drones for good",
  icon: {
    src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431239/codeforafrica/icons/Type_africanDRONE_exwdyu.svg",
  },
  href: "/projects/acfrican-drone",
  tag: "Projects",
};

describe("<ProjectTile />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ProjectTile {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
