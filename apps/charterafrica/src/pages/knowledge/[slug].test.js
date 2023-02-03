import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Page from "./[slug].page";

import theme from "@/charterafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  locale: "en",
  locales: ["en", "fr", "pt"],
};

describe("/knowledge/explainers", () => {
  it("renders unchanged", () => {
    const { container } = render(<Page {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
