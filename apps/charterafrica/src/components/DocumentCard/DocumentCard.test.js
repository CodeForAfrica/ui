import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DocumentCard from "./DocumentCard";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  href: "url=https://dc.sourceafrica.net/documents/120991-Case-Study-Drones-and-the-2017-Sierra-Leone.html&contrubutor=true&showNotes=true",
  contributor: "Contributor",
  createdAt: "2021-09-01",
  image: "/images/hero-slide-1.jpg",
  pages: 10,
  title: "Document Title",
  pinned: false,
};

describe("<DocumentCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DocumentCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
