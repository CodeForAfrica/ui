import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DatasetFilterBar from "./DatasetFilterBar";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  countriesList: ["Kenya", "Uganda", "Tanzania", "Nigeria"],
  selectedCountries: ["Kenya", "Uganda"],
  tagsList: ["Agriculture", "Health", "Education"],
  selectedTags: ["Agriculture"],
  options: {
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
    datasets: "Datasets",
  },
  showDocuments: true,
  documents: {
    href: "/documents",
    label: "Documents",
  },
};

describe("<DatasetFilterBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DatasetFilterBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
