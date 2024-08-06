import { render } from "@commons-ui/testing-library";
import * as React from "react";

import ShareButton from "./ShareButton";

describe("ShareButton", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <ShareButton name="Facebook" url="https://codeforafrica.org" />,
    );
    expect(container).toMatchSnapshot();
  });
});
