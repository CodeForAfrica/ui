import { createRender } from "@commons-ui/testing-library";
import React from "react";

import FocalCountries from "./FocalCountries";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  slug: "focal-countries",
  title: "Focal Countries",
  description: [
    {
      children: [
        {
          text: "The Charter Project is a pan-African initiative by a coalition of watchdog organisations that use civic technologies to strengthen democracy.",
          children: null,
        },
      ],
    },
  ],
  countries: [
    {
      code: "ZWE",
      name: "Zimbabwe",
      position: [-19.0169211, 29.1528018],
      items: [
        { color: "#603549", name: "Tools", total: 350, value: 150 },
        { color: "#AAD4A9", name: "Data docs", total: 300, value: 230 },
        {
          color: "#F7CE46",
          name: "Policy docs",
          total: 200,
          value: 60,
        },
        {
          color: "#F29D88",
          name: "Fellowships",
          total: 200,
          value: 45,
        },
        { color: "#4E2037E5", name: "Grants", total: 200, value: 32 },
        { color: "#B560D0", name: "Trainings", total: 200, value: 15 },
      ],
      link: {
        content: "Explore",
      },
    },
  ],
};

describe("<FocalCountries />", () => {
  it("renders unchanged", () => {
    const { container } = render(<FocalCountries {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
