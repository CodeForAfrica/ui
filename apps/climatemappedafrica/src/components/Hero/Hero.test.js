import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Hero from ".";

import theme from "@/climatemappedafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: [
    {
      children: [
        { text: "Data to hold your government accountable", children: null },
      ],
    },
  ],
  subtitle: [
    {
      children: [
        {
          text: "PesaYetu helps journalists, researchers and activists transform their work with in-depth county-specific information. Get started now with datasets from Kenya.\n",
          children: null,
        },
      ],
    },
  ],
  searchLabel: "Search for a location",
  featuredLocations: [],
  searchPlaceholder: "Search for a location",
  properties: {
    code: "KE",
    name: "Kenya",
    area: 586002.515,
    parent: "AF",
    level: "country",
    version: "Climate",
  },
  location: {},
  level: "country",
  id: "670e3996766697e7feb349d5",
  blockType: "hero",
  slug: "hero",
  boundary: {
    type: "FeatureCollection",
    features: [],
  },
  variant: "explore",
  icon: null,
  legend: [
    { min: 10, max: 13, color: "#021AFE" },
    { min: 13, max: 16, color: "#5455FF" },
    { min: 16, max: 19, color: "#928EFD" },
    { min: 19, max: 22, color: "#B494DF" },
    { min: 22, max: 25, color: "#FA9B9B" },
    { min: 25, max: 28, color: "#F96264" },
    { min: 28, max: 31, color: "#F80701" },
  ],
};

describe("<Hero />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Hero {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
