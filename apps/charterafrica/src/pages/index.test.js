import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Index from "./index.page";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  locale: "en-GB",
  locales: ["en-GB", "fr", "pt"],
};

describe("/", () => {
  it("renders unchanged", () => {
    const { container } = render(<Index {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
