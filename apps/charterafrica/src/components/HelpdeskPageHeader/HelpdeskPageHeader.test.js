import { createRender } from "@commons-ui/testing-library";
import React from "react";

import HelpdeskPageHeader from "./HelpdeskPageHeader";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: [
    {
      children: [
        {
          text: "Democracy ",
          children: null,
        },
        {
          text: "Helpdesk",
          bold: true,
          children: null,
        },
      ],
    },
  ],
  logo: {
    url: "/images/mooc.png",
    alt: "Helpdesk",
  },
};

describe("<HelpdeskPageHeader/>", () => {
  it("renders unchanged", () => {
    const { container } = render(<HelpdeskPageHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
