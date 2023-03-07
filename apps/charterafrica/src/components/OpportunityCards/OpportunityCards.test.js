import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OpportunityCards from "./OpportunityCards";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Grants",
  items: [
    {
      id: 1,
      title: "Democratic Governance in Zambia",
      excerpt: [
        {
          children: [
            {
              text: "This call will focus on using civic tech solutions to strengthen democratic governance in Zambia.",
            },
          ],
        },
      ],
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
      deadlineText: "Deadline: ",
      deadline: "2023-02-11",
      status: "open",
    },
    {
      id: 2,
      title: "Democratic Governance in Zambia",
      description: [
        {
          children: [
            {
              text: "This call will focus on using civic tech solutions to strengthen democratic governance in Zambia.",
            },
          ],
        },
      ],
      image: {
        id: "63d2622aafe25f6469605eae",
        alt: `Grant 2`,
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
      deadlineText: "Deadline: ",
      deadline: "2023-02-11",
      status: "closed",
    },
    {
      id: 3,
      title: "Democratic Governance in Zambia",
      description: [
        {
          children: [
            {
              text: "This call will focus on using civic tech solutions to strengthen democratic governance in Zambia.",
            },
          ],
        },
      ],
      image: {
        id: "63d2622aafe25f6469605eae",
        alt: `Grant 3`,
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
      status: "upcoming",
    },
  ],
  config: {
    showAllText: "Show All",
    showLessText: "Show Less",
    deadlineText: "Deadline",
    showOnMobile: ["open", "closed"],
    statusGroupTitleSuffix: "Calls",
  },
};

describe("<OpportunityCards />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OpportunityCards {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
