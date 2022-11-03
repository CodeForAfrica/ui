import { createRender } from "@commons-ui/testing-library";
import React from "react";

import GetInvolved from "./GetInvolved";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    asPath: "",
    isReady: true,
  })),
}));

const defaultProps = {
  list: [
    {
      title: "Beneficiaries trained",
      value: 15000,
      image: {
        src: "/images/Type=layout,%20Size=32,%20Color=1020E1.svg",
      },
      content:
        "In 10 years, 15 000 trainees have learned new skills and knowledge within the civic tech and media space.",
    },
  ],
  action: {
    content: "Get Involved",
    href: "/contact",
  },
};

describe("<GetInvolved />", () => {
  it("renders unchanged", () => {
    const { container } = render(<GetInvolved {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
