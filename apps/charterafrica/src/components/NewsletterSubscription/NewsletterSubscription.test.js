import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NewsletterSubscription from "./NewsletterSubscription";

import theme from "@/charterafrica/theme";

const render = createRender({ theme });

const defaultProps = {
  embedCode: "",
};

describe("<NewsletterSubscription />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NewsletterSubscription {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
