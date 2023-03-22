import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Consultations from "./Consultations";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  config: {
    mostRecentText: "Most Recent",
    relevanceText: "Relevance",
    sortByText: "Sort by",
    commentsLabel: "Comments",
    previousTitle: "Previous Consultations",
    airedOnText: "Aired On",
  },
  featuredConsultations: { items: [] },
  otherConsultations: { items: [] },
};

describe("<Consultations />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Consultations {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
