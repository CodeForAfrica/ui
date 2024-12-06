import { createRender } from "@commons-ui/testing-library";
import React from "react";

import LongForm from ".";

import theme from "@/codeforafrica/theme";

const render = createRender({ theme });

describe("<NavBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<LongForm />);
    expect(container).toMatchSnapshot();
  });
});
