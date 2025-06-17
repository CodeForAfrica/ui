import { createRender } from "@commons-ui/testing-library";
import React from "react";

import HelplineCard from "./HelplineCard";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Anti Trolling",
  slug: "anti-trolling",
  link: "/helplines/anti-trolling",
  excerpt:
    "Our fact-checkers & forensic investigators are on standby to verify claims or expose the puppet masters behind smear campaigns.",
  media: {
    alt: "Resources 1",
    src: "/resources-1.jpg",
  },
  linkLabel: "Get Support",
};

describe("<HelplineCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<HelplineCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
