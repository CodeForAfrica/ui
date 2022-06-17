import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Opportunities from "./index.page";

import theme from "@/codeforafrica/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  sections: [
    {
      slug: "hero",
      title: "Opportunities",
      subtitle: "Come build digital democracies with Code for Africa",
    },
  ],
};

describe("<Pages/Opportunities />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Opportunities {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
