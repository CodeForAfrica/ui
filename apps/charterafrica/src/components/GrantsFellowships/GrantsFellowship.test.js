import { createRender } from "@commons-ui/testing-library";
import React from "react";

import GrantsFellowships from "./GrantFellowship";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Grants and Fellowships",
  bannerText: "A list of all Charter Africa grants, fellowships and events",
  grants: [
    {
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
    {
      id: 2,
      title: "Democratic Governance in Zambia",
      description:
        "This call will focus on using civic tech solutions to strengthen democratic governance in Zambia.",
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
      deadline: "2023-02-11",
      status: "closed",
    },
    {
      id: 3,
      title: "Democratic Governance in Zambia",
      description:
        "This call will focus on using civic tech solutions to strengthen democratic governance in Zambia.",
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
  fellowships: [
    {
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
        url: "/images/fellowships.pg",
      },
      deadline: "2023-02-11",
      category: "technologies",
    },
    {
      id: 2,
      title: "Democratic Governance in Zambia",
      description:
        "This call will focus on using civic tech solutions to strengthen democratic governance in Zambia.",
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
        url: "/images/fellowships.pg",
      },
      deadline: "2023-02-11",
      category: "other",
    },
    {
      id: 3,
      title: "Democratic Governance in Zambia",
      description:
        "This call will focus on using civic tech solutions to strengthen democratic governance in Zambia.",
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
        url: "/images/fellowships.pg",
      },
      deadline: "2023-02-11",
      category: "other",
    },
  ],
};

describe("<GrantsFellowships />", () => {
  it("renders unchanged", () => {
    const { container } = render(<GrantsFellowships {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
