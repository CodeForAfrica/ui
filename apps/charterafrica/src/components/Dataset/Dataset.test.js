import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Dataset from "./Dataset";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  formats: ["CSV", "PDF"],
  notes:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.",
  title: "Document Title",
  created: "2021-01-01T00:00:00.000Z",
  updated: "2021-01-01T00:00:00.000Z",
  author: "Author Name",
  labels: {
    countries: "Countries",
    tags: "Tags",
    sort: "Sort",
    search: "Search",
    updated: "Updated",
    created: "Created",
    backToDatasets: "Back to Datasets",
    openDataset: "Open Dataset",
    seeMoreDatasets: "See more datasets",
    shareDataset: "Share Via",
  },
  id: "1234",
  url: "https://example.com",
};

describe("<Dataset />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Dataset {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
