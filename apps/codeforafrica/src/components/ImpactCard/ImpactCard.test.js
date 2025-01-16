import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ImpactCard from "./ImpactCard";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Beneficiaries trained",
  value: 15000,
  image: {
    src: "/images/Type=layout,%20Size=32,%20Color=1020E1.svg",
  },
  description: [
    {
      children: [
        {
          text: "Our team makes an impact in more than 20 countries where members are present.",
          children: null,
        },
      ],
    },
  ],
};

describe("<ImpactCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ImpactCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
