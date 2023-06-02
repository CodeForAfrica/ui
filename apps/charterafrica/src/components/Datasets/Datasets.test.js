import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Datasets from "./Datasets";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  countries: ["Kenya", "Uganda", "Tanzania", "Nigeria"],
  tags: ["Agriculture", "Health", "Education"],
  data: [
    {
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
      id: "1234",
    },
  ],
  sortOptions: [
    {
      label: {
        en: "Most Recent",
        fr: "Plus récent",
        pt: "Mais recente",
      },
      value: "metadata_created desc",
    },
    {
      label: {
        en: "Least Recent",
        fr: "Moins récent",
        pt: "Menos recente",
      },
      value: "metadata_created asc",
    },
  ],
  labels: {
    countries: "Countries",
    tags: "Tags",
    sort: "Sort",
    search: "Search",
  },
  commonLabels: {
    updated: "Updated",
    created: "Created",
    backToDatasets: "Back to Datasets",
    openDataset: "Open Dataset",
    seeMoreDatasets: "See more datasets",
    shareDataset: "Share Via",
  },
  related: [
    {
      formats: ["CSV", "PDF"],
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit.",
      title: "Document Title",
      created: "2021-01-01T00:00:00.000Z",
      updated: "2021-01-01T00:00:00.000Z",
    },
  ],
  documents: {
    totalDocuments: 30,
    perPage: 10,
    currentPage: 1,
    totalPages: 3,
    documents: Array.from({ length: 10 }, (_, i) => ({
      id: i,
      contributor: `Contributor ${i}`,
      createdAt: "2021-09-01",
      description: `Document Description ${i}`,
      image: "/images/hero-slide-1.jpg",
      pages: 10,
      title: `Document Title ${i}`,
      url: "https://dc.sourceafrica.net/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html",
    })),
    options: {
      url: "https://dc.sourceafrica.net/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html",
      showNotes: true,
      showSearch: true,
      showText: true,
      showZoom: true,
    },
  },
};

describe("<Datasets />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Datasets {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
