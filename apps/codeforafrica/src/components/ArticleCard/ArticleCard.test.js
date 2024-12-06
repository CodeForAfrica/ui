import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ArticleCard from "./ArticleCard";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

describe("<ArticleCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ArticleCard />);
    expect(container).toMatchSnapshot();
  });
});
