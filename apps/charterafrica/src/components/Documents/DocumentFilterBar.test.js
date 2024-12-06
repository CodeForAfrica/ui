import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DocumentFilterBar from "./DocumentFilterBar";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  pageUrl: "/documents",
  options: {
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
  },
  labels: {
    documents: "Documents",
    updated: "Updated",
    created: "Created",
    backToDatasets: "Back to Datasets",
    openDataset: "Open Dataset",
    seeMoreDatasets: "See more datasets",
    shareDataset: "Share Via",
    show: "Show",
  },
  showDocuments: true,
  datasets: {
    href: "/datasets",
    label: "Datasets",
  },
};

describe("<DocumentFilterBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DocumentFilterBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
