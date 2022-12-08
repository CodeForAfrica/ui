import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ProjectTileList from "./ProjectTileList";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  projects: [
    {
      slug: "african-drone",
      name: "africanDRONE",
      tagLine: "Drones for good",
      icon: {
        src: "https://res.cloudinary.com/code-for-africa/image/upload/v1652431239/codeforafrica/icons/Type_africanDRONE_exwdyu.svg",
      },
      href: "/projects/acfrican-drone",
      tag: "Projects",
    },
  ],
};

describe("<ProjectTileList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ProjectTileList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
