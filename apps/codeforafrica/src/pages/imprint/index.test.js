import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Imprint from "./index.page";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  content: "<h1>Hello</h1><p>World</p>",
  sections: [
    {
      slug: "hero",
      title: "Imprint",
      subtitle: "Code for Africa organisation structure",
    },
  ],
};

describe("<Pages/Imprint />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Imprint {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
