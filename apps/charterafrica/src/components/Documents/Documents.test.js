import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Documents from "./Documents";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  q: "group:ADF",
  documents: [
    {
      contributor: "Contributor",
      createdAt: "2021-09-01",
      description: "Document Description",
      image: "/images/hero-slide-1.jpg",
      pages: 10,
      title: "Document Title",
      url: "https://dc.sourceafrica.net/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html",
    },
  ],
  options: {
    url: "https://dc.sourceafrica.net/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html",
    showNotes: true,
    showSearch: true,
    showText: true,
    showZoom: true,
  },
};

describe("<Documents />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Documents {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
