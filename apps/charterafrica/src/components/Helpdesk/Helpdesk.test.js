import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Helpdesk from "./Helpdesk";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  slug: "helpdesk",
  description: `
          <p>
            Need help connecting with experts?<br />
            We can help you find specialists or resources to improve the impact of your democracy project.
          </p>
          `,
  image: {
    src: "/images/helpdesk.svg",
  },
  link: {
    content: "Submit request",
  },
  title: "Democracy Support Helpdesk",
};

describe("<Helpdesk />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Helpdesk {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
