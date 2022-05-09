import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ChoiceChipGroup from "./ChoiceChipGroup";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<ChoiceChipGroup />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ChoiceChipGroup />);
    expect(container).toMatchSnapshot();
  });
});
