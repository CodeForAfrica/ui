import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ExplorePageError from "./ExplorePageError";

import theme from "@/climatemappedafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  error: {
    code: "404",
    message: "Region Not Found",
  },
};

describe("<ExplorePageError/>", () => {
  it("Renders Unchanged", () => {
    const { container } = render(<ExplorePageError {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
