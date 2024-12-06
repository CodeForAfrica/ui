import { createRender } from "@commons-ui/testing-library";
import React from "react";

import LanguageButton from "./LanguageButton";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  languages: [
    { label: "English", locale: "en" },
    { label: "Francais", locale: "fr" },
  ],
};

describe("<LanguageButton />", () => {
  it("renders unchanged", () => {
    const { container } = render(<LanguageButton {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
