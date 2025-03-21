import { createRender } from "@commons-ui/testing-library";
import React from "react";

import GetInvolved from "./GetInvolved";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  impacts: [
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
  action: {
    label: "Get Involved",
    href: "/contact",
  },
};

describe("<GetInvolved />", () => {
  it("renders unchanged", () => {
    const { container } = render(<GetInvolved {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
