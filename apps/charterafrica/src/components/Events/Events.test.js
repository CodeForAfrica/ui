import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Events from "./Events";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Events",
  items: [
    {
      id: 1,
      title: "Democratic Governance in Zambia",
    },
    {
      id: 2,
      title: "Democratic Governance in Zambia",
      description:
        "This call will focus on using civic tech solutions to strengthen democratic governance in Zambia.",
    },
    {
      id: 3,
      title: "Democratic Governance in Zambia",
      description:
        "This call will focus on using civic tech solutions to strengthen democratic governance in Zambia.",
    },
  ],
};

describe("<Events />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Events {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
