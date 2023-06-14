import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DatasetCard from "./DatasetCard";

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
    created: "Created",
    updated: "Updated",
    backToDatasets: "Back to dataset",
    openDataset: "Open dataset",
    readLess: "Read less",
    readMore: "Read more",
    seeMoreDatasets: "See more datasets",
    shareDataset: "Share dataset",
  },
  id: "1234",
  url: "https://example.com",
  href: "/resources/datasets",
};

describe("<DatasetCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DatasetCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
