import { createRender } from "@commons-ui/testing-library";
import React from "react";

import OurMission from "./OurMission";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<OurMission />", () => {
  it("renders unchanged", () => {
    const { container } = render(<OurMission title="Our mission" />);
    expect(container).toMatchSnapshot();
  });
});
