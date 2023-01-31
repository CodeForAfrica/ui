import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PageInfo from "./PageInfo";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  info: [
    {
      children: [
        {
          text: "The Charter Project is a pan-African initiative by a coalition of watchdog organisations that use civic technologies to strengthen democracy.",
          children: null,
        },
      ],
    },
  ],
};

describe("<PageInfo />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PageInfo {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
