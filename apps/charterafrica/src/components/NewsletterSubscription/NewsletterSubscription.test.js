import { createRender } from "@commons-ui/testing-library";
import React from "react";

import NewsletterSubscription from "./NewsletterSubscription";

import theme from "@/charterafrica/theme";
import subscriptionEmbedCode from "@/charterafrica/utils/subscriptionEmbedCode";

// eslint-disable-next-line testing-library/render-result-naming-convention
const render = createRender({ theme });

const defaultProps = {
  embedCode: subscriptionEmbedCode,
};

describe("<NewsletterSubscription />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NewsletterSubscription {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
