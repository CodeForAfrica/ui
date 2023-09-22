import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ImpactCardList from "./ImpactCardList";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  list: [
    {
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
    },
  ],
};

describe("<ImpactCardList />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ImpactCardList {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
