import { createRender } from "@commons-ui/testing-library";
import React from "react";

import SpotlightCard from "./SpotlightCard";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "TrustLab Incubator Programme",
  slug: "trustlab-incubator-programme",
  link: "/opportunities/trustlab-incubator-programme",
  tag: "Opportunity",
  shortDescription:
    "Our fact-checkers & forensic investigators are on standby to verify claims or expose the puppet masters behind smear campaigns.",
  media: {
    alt: "Resources 1",
    src: "/resources-1.jpg",
  },
};

describe("<SpotlightCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<SpotlightCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
