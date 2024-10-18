import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Hero from "./Hero";

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
};

describe("<Hero />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Hero {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
