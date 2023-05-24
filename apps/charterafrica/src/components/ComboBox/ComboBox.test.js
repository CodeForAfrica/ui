import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ComboBox from "./ComboBox";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  label: "Countries",
  options: ["Kenya", "Uganda", "Tanzania", "Nigeria"],
  renderInput: () => null,
};

describe("<ComboBox />", () => {
  it("renders unchanged", () => {
    const { container } = render(<ComboBox {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
