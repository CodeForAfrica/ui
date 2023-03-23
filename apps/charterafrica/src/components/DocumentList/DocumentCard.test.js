import { createRender } from "@commons-ui/testing-library";
import React from "react";

import DocumentCard from "./DocumentCard";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  contributor: "Contributor",
  created_at: "2021-09-01",
  image: "/images/hero-slide-1.jpg",
  locale: "en",
  pages: 10,
  title: "Document Title",
};

describe("<DocumentCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<DocumentCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
