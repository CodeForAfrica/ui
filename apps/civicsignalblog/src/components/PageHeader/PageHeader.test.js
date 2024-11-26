import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PageHeader from "./PageHeader";

import theme from "@/civicsignalblog/theme";

const render = createRender({ theme });

const defaultProps = {
  title: "Contact",
  subtitle: [
    {
      children: [
        { text: "Let's", children: null },
        { children: null, bold: true, text: " start " },
        { children: null, text: "something" },
        { children: null, bold: true, text: " together" },
      ],
    },
  ],
};

describe("<PageHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PageHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
