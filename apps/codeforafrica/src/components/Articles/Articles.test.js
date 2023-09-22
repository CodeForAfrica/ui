import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Articles from "./Articles";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  articles: [],
  featured: [],
  pagination: {
    count: 10,
    page: 1,
  },
  labels: {
    readMore: "Read More",
    search: "Search",
  },
  tags: ["tag1", "tag2"],
  title: "Title",
};

describe("<Articles />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Articles {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
