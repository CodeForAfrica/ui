import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Comments from "./Comments";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  comments: [],
  config: {
    mostRecentText: "Most Recent",
    relevanceText: "Relevance",
    sortByText: "Sort by",
    commentsLabel: "Comments",
  },
};

describe("<Comments />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Comments {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
