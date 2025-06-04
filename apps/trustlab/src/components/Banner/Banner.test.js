import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Banner from "./Banner";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  backgroundColor: "#02041C",
  title: "About TrustLab",
  description:
    "TrustLab is a three-year EU-funded initiative by DW Akademie, Code for Africa (CfA), and Siasa Place.",
  image: {
    src: "/images/cms/blocks/banner.png",
    alt: "TrustLab Banner",
  },
  isPageHeader: true,
};

describe("<Banner />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Banner {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
