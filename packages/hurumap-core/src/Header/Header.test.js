import { render } from "@commons-ui/testing-library";
import React from "react";

import Header from ".";

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
