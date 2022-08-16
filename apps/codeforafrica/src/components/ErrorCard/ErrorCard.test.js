import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ErrorCard from "./ErrorCard";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<ErrorCard />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ErrorCard />);
    expect(container).toMatchSnapshot();
  });
});
