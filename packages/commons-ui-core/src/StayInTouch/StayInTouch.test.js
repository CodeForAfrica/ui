import { createRender } from "@commons-ui/testing-library";
import React from "react";

import StayInTouch from "./StayInTouch";

import { createTheme } from "@/commons-ui/core/styles";

const render = createRender({ theme: createTheme() });

const defaultProps = {
  title: "Stay in Touch:",
  links: [
    {
      platform: "github",
      url: "https://github.com/CodeForAfrica",
    },
  ],
};

describe("<StayInTouch />", () => {
  it("renders unchanged", () => {
    const { container } = render(<StayInTouch {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
