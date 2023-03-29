import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DocumentCard from "./DocumentCard";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  canonical_url:
    "https://dc.sourceafrica.net/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html",
  contributor: "Contributor",
  created_at: "2021-09-01",
  image: "/images/hero-slide-1.jpg",
  pages: 10,
  title: "Document Title",
  options: {
    url: "https://dc.sourceafrica.net/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html",
    showNotes: true,
    showSearch: true,
    showText: true,
    showZoom: true,
  },
};

describe("<DocumentCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DocumentCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
