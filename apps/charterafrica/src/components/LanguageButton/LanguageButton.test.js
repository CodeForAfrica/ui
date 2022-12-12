import { createRender } from "@commons-ui/testing-library";
import React from "react";

import LanguageButton from "./LanguageButton";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {};

describe("<LanguageButton />", () => {
  it("renders unchanged", () => {
    const { container } = render(<LanguageButton {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
