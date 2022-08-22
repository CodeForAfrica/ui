import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ErrorHero from "./ErrorHero";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<ErrorHero />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ErrorHero />);
    expect(container).toMatchSnapshot();
  });
});
