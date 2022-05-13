import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ChoiceChip from "./ChoiceChip";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<ChoiceChip />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ChoiceChip />);
    expect(container).toMatchSnapshot();
  });
});
