import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DatasetFilterBar from "./DatasetFilterBar";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  countries: ["Kenya", "Uganda", "Tanzania", "Nigeria"],
  tags: ["Agriculture", "Health", "Education"],
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
};

describe("<DatasetFilterBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DatasetFilterBar {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
