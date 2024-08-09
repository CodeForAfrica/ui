import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NextImageButton from "./NextImageButton";

import theme from "@/civicsignalblog/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<NextImageButton />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NextImageButton />);
    expect(container).toMatchSnapshot();
  });
});
