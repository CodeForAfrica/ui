import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Card from "./Card";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Digital Security Toolkit for Kenyan Activists",
  linkLabel: "Learn More",
  link: "/",
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
  media: {
    alt: "Resources 1",
    src: "/resources-1.jpg",
  },
  tag: "Toolkits",
};

describe("<Card />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Card {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
