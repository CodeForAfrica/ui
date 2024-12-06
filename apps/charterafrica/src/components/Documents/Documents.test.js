import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Documents from "./Documents";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  q: "group:ADF",
  documents: Array.from({ length: 10 }, (_, i) => ({
    contributor: `Contributor ${i}`,
    createdAt: "2021-09-01",
    description: `Description ${i}`,
    image: "/images/hero-slide-1.jpg",
    pages: 10,
    title: `Title ${i}`,
    url: "https://dc.sourceafrica.net/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html",
    href: "/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html",
  })),
  pinned: Array.from({ length: 3 }, (_, i) => ({
    contributor: `Contributor ${i}`,
    createdAt: "2021-09-01",
    description: `Description ${i}`,
    image: "/images/hero-slide-1.jpg",
    pages: 10,
    title: `Title ${i}`,
    url: "https://dc.sourceafrica.net/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html",
    href: "/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html",
  })),
  documentOptions: {
    url: "https://dc.sourceafrica.net/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html",
    showNotes: true,
    showSearch: true,
    showText: true,
    showZoom: true,
  },
  total: 1,
  pathname: "/documents",
  showFilterBar: true,
  filterBar: {
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
  },
  showDatasets: true,
  datasets: {
    href: "/datasets",
    label: "Datasets",
  },
};

describe("<Documents />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Documents {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
