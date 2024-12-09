import { createRender } from "@commons-ui/testing-library";
import React from "react";

import CommunityPlatforms from "./CommunityPlatforms";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  slug: "our-community-platforms",

  items: [
    {
      id: "63f4a3d6300ca6d03a3f1d87",
      name: "Newsletter",
      description: [
        {
          children: [
            {
              text: "Receive updates on the Charter Project Africa",
              children: null,
            },
          ],
        },
      ],
      icon: {
        id: "63f49b02c8ea15550cfbc246",
        alt: "Newsletter icon",
        prefix: "media",
        url: "/images/newsletter-icon.svg",
      },
      link: {
        label: "Sign up today",
        linkType: "custom",
        url: "https://codeforafrica.org",
        href: "https://codeforafrica.org",
      },
      background: {
        color: "#4D2137",
        image: {
          id: "63f49b40c8ea15550cfbc253",
          alt: "Newsletter background",
          url: "/images/newsletter-background.jpg",
        },
      },
      createdAt: "2023-02-21T10:58:30.637Z",
      updatedAt: "2023-02-21T11:45:18.111Z",
    },
  ],
};

describe("<CommunityPlatforms />", () => {
  it("renders unchanged", () => {
    const { container } = render(<CommunityPlatforms {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
