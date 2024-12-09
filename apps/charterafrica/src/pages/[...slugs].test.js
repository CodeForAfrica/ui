import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Page from "./[...slugs].page";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {};

describe("/[...slugs]", () => {
  it("renders unchanged", () => {
    const { container } = render(<Page {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
