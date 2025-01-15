import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Datasets from "./Datasets";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  organizationId: "the-charter-project",
  countries: ["Kenya", "Uganda", "Tanzania", "Nigeria"],
  tags: [],
  pageUrl: "/datasets",
  filterBar: {
    countries: {
      label: "Countries",
    },
    search: {
      label: "Search",
    },
    sort: {
      label: "Sort",
      options: [
        {
          label: "Most Recent",
          value: "metadata_created desc",
        },
      ],
    },
    tags: {
      label: "Tags",
    },
  },
  labels: {
    datasets: "Datasets",
    updated: "Updated",
    created: "Created",
    backToDatasets: "Back to Datasets",
    openDataset: "Open Dataset",
    seeMoreDatasets: "See more datasets",
    shareDataset: "Share Via",
  },
  datasets: Array.from({ length: 10 }, (_, i) => ({
    formats: ["CSV", "PDF"],
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.",
    title: "Document Title",
    created: "2021-01-01T00:00:00.000Z",
    updated: "2021-01-01T00:00:00.000Z",
    author: "Author Name",
    url: "https://example.com",
    source: "https://example.com",
    href: "/resources/datasets",
    id: i,
  })),
  totalPages: 10,
  showDocuments: true,
  documents: {
    href: "/documents",
    label: "Documents",
  },
};

describe("<Datasets />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Datasets {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
