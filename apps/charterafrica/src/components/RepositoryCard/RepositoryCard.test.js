import { createRender } from "@commons-ui/testing-library";
import React from "react";

import RepositoryCard from "./RepositoryCard";

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

describe("<RepositoryCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<RepositoryCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
