import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Articles from "./Articles";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  articles: {
    results: [],
    totalPages: 0,
  },
  filters: {
    search: {
      placeholder: "Search",
    },
    sortOrder: [
      { value: "-publishedOn", label: "Most recent" },
      { value: "publishedOn", label: "Least recent" },
      { value: "title", label: "Title A-Z" },
      { value: "-title", label: "Title Z-A" },
    ],
  },
};

describe("<Articles />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Articles {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
