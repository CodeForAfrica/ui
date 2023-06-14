import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Datasets from "./Datasets";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  organizationId: "the-charter-project",
  countries: ["Kenya", "Uganda", "Tanzania", "Nigeria"],
  tags: ["Agriculture", "Health", "Education"],
  datasets: [
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
  totalPages: 10,
  filterBar: {
    countries: {
      label: "Countries",
    },
    tags: {
      label: "Tags",
    },
    sort: {
      label: "Sort",
      options: [
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
    },
    search: {
      label: "Search",
    },
  },
  labels: {
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
};

describe("<Datasets />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Datasets {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
