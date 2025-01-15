import { createRender } from "@commons-ui/testing-library";
import React from "react";

import Header from ".";

import theme from "@/climatemappedafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  overline: "Overline",
  title: 'Title with <span class="highlight">Highlight</span>',
  subtitle: "A short paragraph to describe what the header is all about.",
};

describe("<Header />", () => {
  it("renders unchanged", () => {
    const { container } = render(<Header {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
