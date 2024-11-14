import { createRender } from "@commons-ui/testing-library";
import React from "react";

import MeetOurTeam from "./MeetOurTeam";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  slug: "our-team",
  title: "title",
  description: [
    {
      children: [
        {
          text: "Africa's",
          bold: true,
          children: null,
        },
        {
          text: "largest network of civic tech and open data labs",
          children: null,
        },
      ],
    },
  ],
  image: {
    alt: "Our offices across africa",
    src: "/images/Africa@2400x 1",
  },
  action: {
    href: "/about#our-team",
    label: "Meet our team",
  },
};

describe("<MeetOurTeam />", () => {
  it("renders unchanged", () => {
    const { container } = render(<MeetOurTeam {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
