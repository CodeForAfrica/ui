import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ChoiceChip from "./ChoiceChip";

import theme from "@/civicsignalblog/theme";

const render = createRender({ theme });

describe("<ChoiceChip />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ChoiceChip />);
    expect(container).toMatchSnapshot();
  });
});
