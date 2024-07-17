import { render } from "@commons-ui/testing-library";
import * as React from "react";

import Source from "./Source";

describe("Source", () => {
  it("renders unchanged", () => {
    const { container } = render(
      <Source title="Source" href="https://example.com">
        Link to source
      </Source>,
    );
    expect(container).toMatchSnapshot();
  });
});
