import { render } from "@commons-ui/testing-library";
import * as React from "react";

import LocationTag from "./LocationTag";

describe("LocationTag", () => {
  it("renders unchanged", () => {
    const { container } = render(<LocationTag name="Region" level="region" />);
    expect(container).toMatchSnapshot();
  });
});
