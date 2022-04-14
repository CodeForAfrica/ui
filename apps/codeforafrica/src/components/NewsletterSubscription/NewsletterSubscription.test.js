import { render } from "@testing-library/react";
import React from "react";

import NewsletterSubscription from "./NewsletterSubscription";

describe("<NewsletterSubscription />", () => {
  it("renders unchanged", () => {
    const { container } = render(<NewsletterSubscription />);
    expect(container).toMatchSnapshot();
  });
});
