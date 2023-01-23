import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Helpdesk from "./Helpdesk";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  slug: "helpdesk",
  description: [
    { children: [{ text: "Need help connecting with experts?" }] },
    {
      children: [
        {
          text: "\nWe can help you find specialists or resources to improve the impact of your democracy project.",
        },
      ],
    },
  ],
  image: {
    alt: "Helpdesk",
    src: "/images/helpdesk.svg",
  },
  link: {
    label: "Submit request",
  },
  title: "Democracy Support Helpdesk",
};

describe("<Helpdesk />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Helpdesk {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
