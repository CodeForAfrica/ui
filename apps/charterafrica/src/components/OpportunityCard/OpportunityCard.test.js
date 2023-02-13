import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OpportunityCard from "./OpportunityCard";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  opportunity: {
    id: 1,
    title: "Democratic Governance in Zambia",
    description:
      "This call will focus on using civic tech solutions to strengthen democratic governance in Zambia.",
    image: {
      id: "63d2622aafe25f6469605eae",
      alt: `Grant 1`,
      prefix: "media",
      filename: "Rectangle 113.jpg",
      mimeType: "image/jpg",
      filesize: 257010,
      width: 1236,
      height: 696,
      createdAt: "2023-01-26T11:21:14.868Z",
      updatedAt: "2023-01-26T11:21:14.868Z",
      url: "/images/the-charter-project-africa_brandguide_guidedemarque-2-2.jpg",
    },
    deadline: "2023-02-11",
    status: "open",
  },
};

describe("<OpportunityCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OpportunityCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
