import { createRender } from "@commons-ui/testing-library";
import React from "react";

import HelpdeskPageContent from "./HelpdeskPageContent";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  slug: "helpdesk-page-content",
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
  link: {
    label: "Submit request",
  },
};

describe("<HelpdeskPageContent />", () => {
  it("renders unchanged", () => {
    const { container } = render(<HelpdeskPageContent {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
