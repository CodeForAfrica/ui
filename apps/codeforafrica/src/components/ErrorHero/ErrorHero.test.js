import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ErrorHero from "./ErrorHero";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

describe("<ErrorHero />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ErrorHero />);
    expect(container).toMatchSnapshot();
  });
});
