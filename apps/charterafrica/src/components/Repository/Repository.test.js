import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Repository from "./Repository";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  id: 1,
  name: "Repository 1",
  stargazers: 100,
  visibility: "PUBLIC",
  description: "Charter Africa website",
  url: "https://charter.africa",
  updatedAt: "2021-10-01T00:00:00Z",
  techSkills: "React, Next.js, TypeScript",
};

describe("<Repository />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Repository {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
