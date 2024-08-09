import { createRender } from "@commons-ui/testing-library";
import React from "react";

import PageHeader from "./PageHeader";

import theme from "@/civicsignalblog/theme";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  title: "Contact",
  subtitle: "Let’s start something together!",
};

describe("<PageHeader />", () => {
  it("renders unchanged", () => {
    const { container } = render(<PageHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
