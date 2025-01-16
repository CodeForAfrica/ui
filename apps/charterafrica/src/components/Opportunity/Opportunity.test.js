import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Opportunity from "./Opportunity";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Opportunity title",
  image: {
    alt: "Hero 1",
    url: "http://localhost:3000/media/hero-slide-1.jpg",
  },
  date: "DEADLINE: February 6, 2023 at 12:00:00 AM",
  apply: {
    href: "/opportunities/felloships/grants/research-title-goes-here-and-spans-over-second-line",
    label: "Apply Now",
  },
};

describe("<Opportunity />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Opportunity {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
