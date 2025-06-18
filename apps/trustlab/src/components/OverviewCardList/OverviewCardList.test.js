import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OverviewCardList from "./OverviewCardList";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Resources",
  linkLabel: "Learn More",
  items: [
    {
      title: "Digital Security Toolkit for Kenyan Activists",
      excerpt:
        "A digital security toolkit for Kenyan activists, that includes free OutlineVPN, anti-DDoS protection, and CfA's anti-trolling tool, FeedShield.",
      image: {
        alt: "Resources 1",
        src: "/resources-1.jpg",
      },
      tag: "Toolkits",
      href: "/resources/digital-security-toolkit-for-kenyan-activists",
      id: 1,
    },
  ],
  blockType: "resources-overview-list",
};

describe("<OverviewCardList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OverviewCardList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
