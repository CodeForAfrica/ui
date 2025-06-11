import { createRender } from "@commons-ui/testing-library";
import React from "react";

import RelationshipOverviewList from "./RelationshipOverviewList";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Resources",
  linkLabel: "Learn More",
  relationship: [
    {
      title: "Digital Security Toolkit for Kenyan Activists",
      slug: "digital-security-toolkit-for-kenyan-activists",
      description: {
        root: {
          children: [
            {
              children: [
                {
                  text: "A digital security toolkit for Kenyan activists, that includes free OutlineVPN, anti-DDoS protection, and CfA's anti-trolling tool, FeedShield.",
                  type: "text",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "paragraph",
              version: 1,
              textFormat: 0,
              textStyle: "",
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "root",
          version: 1,
        },
      },
      image: {
        alt: "Resources 1",
        src: "/resources-1.jpg",
      },
      tags: [
        {
          name: "Toolkits",
        },
      ],
      link: {
        href: "/resources/digital-security-toolkit-for-kenyan-activists",
      },
      id: 1,
    },
  ],
  blockType: "resources-overview-list",
};

describe("<RelationshipOverviewList />", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <RelationshipOverviewList {...defaultProps} />,
    );
    expect(container).toMatchSnapshot();
  });
});
