import { createRender } from "@commons-ui/testing-library";
import React from "react";

import LongForm from ".";

import theme from "@/civicsignalblog/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

describe("<NavBar />", () => {
  it("renders unchanged", () => {
    const { container } = render(<LongForm />);
    expect(container).toMatchSnapshot();
  });
});
