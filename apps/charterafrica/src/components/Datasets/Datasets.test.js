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
    },
  ],
};

describe("<Datasets />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Datasets {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
