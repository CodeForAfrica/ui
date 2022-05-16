import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ProjectCard from "./ProjectCard";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<ArticleCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ProjectCard />);
    expect(container).toMatchSnapshot();
  });
});
