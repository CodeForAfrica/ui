import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ImpactCard from "./ImpactCard";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Beneficiaries trained",
  value: 15000,
  image: {
    src: "/images/Type=layout,%20Size=32,%20Color=1020E1.svg",
  },
  content:
    "In 10 years, 15 000 trainees have learned new skills and knowledge within the civic tech and media space.",
};

describe("<ImpactCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ImpactCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
