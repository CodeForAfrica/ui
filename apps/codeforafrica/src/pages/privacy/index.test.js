import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Privacy from "./index.page";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  content: "<h1>Hello</h1><p>World</p>",
  sections: [
    {
      slug: "hero",
      title: "Privacy",
      subtitle: "Code for Africa privacy policy",
    },
  ],
};

describe("<Pages/Privacy />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Privacy {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
